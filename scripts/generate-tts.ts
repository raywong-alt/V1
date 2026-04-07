/**
 * Azure TTS 批量音檔生成腳本
 * 幼兒英語評估 App — Xaris Academy
 *
 * 用法：
 *   npm run tts:generate                    # 全量生成（跳過已存在）
 *   npm run tts:generate -- --force         # 強制覆寫所有
 *   npm run tts:generate -- --dry-run       # 預覽，不生成真實檔案
 *   npm run tts:generate -- --category=dictation
 *   npm run tts:generate -- --age=4-5
 *   npm run tts:generate -- --category=letters --age=3-4 --force
 *
 * 環境變數（.env）：
 *   AZURE_SPEECH_KEY    — Azure Speech 訂閱 key
 *   AZURE_SPEECH_REGION — Azure 區域（如 eastasia）
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';

// 透過 tsx 直接 import TypeScript 來源
import { QUESTION_BANK } from '../src/data/questionBank.js';
import { AGE_GROUPS, CATEGORIES } from '../src/types.js';
import type { AgeGroup, Category } from '../src/types.js';

import { ttsConfig } from './tts-config.js';
import {
  buildSSML,
  callAzureTTS,
  getAudioOutputPath,
  getPublicAudioUrl,
  ensureDir,
  fileExists,
  scanExistingAudioFiles,
  generateAudioAssetsSource,
  sleep,
  type AzureCredentials,
} from './tts-utils.js';

// ── CLI 參數解析 ───────────────────────────────────────────────────

const rawArgs = process.argv.slice(2);

function getArgValue(prefix: string): string | undefined {
  const found = rawArgs.find((a) => a.startsWith(`--${prefix}=`));
  return found?.split('=')[1];
}

const cli = {
  category: getArgValue('category') as Category | undefined,
  age:      getArgValue('age') as AgeGroup | undefined,
  force:    rawArgs.includes('--force'),
  dryRun:   rawArgs.includes('--dry-run'),
};

// ── 環境變數驗證 ───────────────────────────────────────────────────

function loadCredentials(): AzureCredentials {
  const key    = process.env['AZURE_SPEECH_KEY'];
  const region = process.env['AZURE_SPEECH_REGION'];

  const missing: string[] = [];
  if (!key)    missing.push('AZURE_SPEECH_KEY');
  if (!region) missing.push('AZURE_SPEECH_REGION');

  if (missing.length > 0) {
    console.error('\n❌ 缺少必要環境變數：');
    missing.forEach((v) => console.error(`   ${v} 未設定`));
    console.error('\n請複製 .env.example 為 .env 並填入 Azure Speech 憑證。');
    console.error('Azure Speech 服務：https://aka.ms/azurespeech\n');
    process.exit(1);
  }

  return { key: key!, region: region! };
}

// ── 待生成題目收集 ─────────────────────────────────────────────────

interface AudioTask {
  id:           string;
  ageGroup:     AgeGroup;
  category:     Category;
  audioLabel:   string;
  questionText: string;
}

function collectTasks(): AudioTask[] {
  const ageGroupsToRun: readonly AgeGroup[] = cli.age
    ? [cli.age as AgeGroup]
    : AGE_GROUPS;

  const categoriesToRun: readonly Category[] = cli.category
    ? [cli.category as Category]
    : CATEGORIES;

  // 驗證 CLI 參數
  if (cli.age && !AGE_GROUPS.includes(cli.age as AgeGroup)) {
    console.error(`❌ 無效的年齡層：${cli.age}`);
    console.error(`   有效選項：${AGE_GROUPS.join(', ')}`);
    process.exit(1);
  }
  if (cli.category && !CATEGORIES.includes(cli.category as Category)) {
    console.error(`❌ 無效的類別：${cli.category}`);
    console.error(`   有效選項：${CATEGORIES.join(', ')}`);
    process.exit(1);
  }

  const tasks: AudioTask[] = [];
  const skippedReasons: string[] = [];

  for (const ageGroup of ageGroupsToRun) {
    for (const category of categoriesToRun) {
      const questions = QUESTION_BANK[ageGroup]?.[category] ?? [];

      for (const q of questions) {
        // 只處理音訊題
        if (q.questionType !== 'listen') {
          skippedReasons.push(`${q.id}：picture 題型，無需音訊`);
          continue;
        }

        // 必須有可朗讀的文本
        const label = q.audioLabel?.trim();
        if (!label) {
          skippedReasons.push(`${q.id}：audioLabel 為空，無法推導朗讀內容`);
          continue;
        }

        tasks.push({
          id:           q.id,
          ageGroup:     q.ageGroup,
          category:     q.category,
          audioLabel:   label,
          questionText: q.questionText,
        });
      }
    }
  }

  if (skippedReasons.length > 0 && cli.dryRun) {
    console.log(`\n⚠️  以下題目不需要生成音訊（共 ${skippedReasons.length} 題）：`);
    skippedReasons.forEach((r) => console.log(`   - ${r}`));
  }

  return tasks;
}

// ── 主流程 ─────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('\n🎙  Azure TTS 批量生成工具 — 幼兒英語評估 App');
  console.log('─'.repeat(52));

  if (cli.dryRun) {
    console.log('模式：🔍 Dry Run（預覽，不生成真實檔案）');
  } else {
    console.log('模式：✅ 正式生成');
  }
  if (cli.category) console.log(`篩選類別：${cli.category}`);
  if (cli.age)      console.log(`篩選年齡：${cli.age}`);
  if (cli.force)    console.log('強制覆寫：開啟');
  console.log('');

  // 載入 Azure 憑證（dry-run 時跳過驗證）
  const creds: AzureCredentials = cli.dryRun
    ? { key: 'DRY_RUN', region: 'DRY_RUN' }
    : loadCredentials();

  // 收集待生成題目
  const tasks = collectTasks();
  console.log(`找到 ${tasks.length} 個需要生成音訊的題目\n`);

  if (tasks.length === 0) {
    console.log('沒有需要處理的題目，結束。');
    return;
  }

  // 生成統計
  let successCount = 0;
  let skippedCount = 0;
  let failedCount  = 0;
  const failedList: Array<{ id: string; reason: string }> = [];

  for (const task of tasks) {
    const outputPath = getAudioOutputPath(task.ageGroup, task.category, task.id);
    const publicUrl  = getPublicAudioUrl(task.ageGroup, task.category, task.id);

    // Dry run：僅顯示 SSML 預覽
    if (cli.dryRun) {
      const ssml = buildSSML({
        audioLabel: task.audioLabel,
        category:   task.category,
        voice:      ttsConfig.englishVoice,
        lang:       'en-US',
      });
      const preview = ssml.replace(/\s+/g, ' ').slice(0, 140);
      console.log(`  🔍 [${task.id}] "${task.audioLabel}"`);
      console.log(`     → ${outputPath}`);
      console.log(`     SSML: ${preview}...`);
      successCount++;
      continue;
    }

    // 跳過已存在的檔案（除非 --force）
    if (!cli.force) {
      const exists = await fileExists(outputPath);
      if (exists) {
        console.log(`  ⏭  跳過 [${task.id}] 已存在（用 --force 覆寫）`);
        skippedCount++;
        continue;
      }
    }

    // 生成 SSML
    const ssml = buildSSML({
      audioLabel: task.audioLabel,
      category:   task.category,
      voice:      ttsConfig.englishVoice,
      lang:       'en-US',
    });

    // 呼叫 Azure TTS
    try {
      const audioBuffer = await callAzureTTS(ssml, creds);
      await ensureDir(path.dirname(outputPath));
      await fs.promises.writeFile(outputPath, audioBuffer);
      console.log(`  ✅ [${task.id}] "${task.audioLabel}" → ${outputPath}`);
      successCount++;
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      console.error(`  ❌ [${task.id}] "${task.audioLabel}" 失敗：${reason}`);
      failedList.push({ id: task.id, reason });
      failedCount++;
    }

    // 請求間延遲，避免 rate limit
    await sleep(ttsConfig.requestDelayMs);
  }

  // 更新 audioAssets.ts（dry-run 時跳過）
  if (!cli.dryRun) {
    const existingMap = await scanExistingAudioFiles();
    const assetsPath = path.join('src', 'assets', 'audio', 'audioAssets.ts');
    const source = generateAudioAssetsSource(existingMap);
    await fs.promises.writeFile(assetsPath, source, 'utf8');
    console.log(`\n📝 已更新 ${assetsPath}（${Object.keys(existingMap).length} 個映射）`);
  }

  // 摘要
  console.log('\n' + '─'.repeat(52));
  console.log('📊 生成摘要');
  console.log(`  ✅ 成功：${successCount} 題`);
  console.log(`  ⏭  跳過：${skippedCount} 題（已存在）`);
  console.log(`  ❌ 失敗：${failedCount} 題`);

  if (failedList.length > 0) {
    console.log('\n失敗清單：');
    for (const { id, reason } of failedList) {
      console.log(`  - ${id}: ${reason}`);
    }
    console.log('\n可重新執行指定失敗類別，例如：');
    const failedCategory = failedList[0]?.id.split('-')[2];
    if (failedCategory) {
      console.log(`  npm run tts:generate -- --category=${failedCategory} --force`);
    }
  }

  if (cli.dryRun) {
    console.log('\n（Dry Run 模式：以上為預覽，未生成真實檔案或更新 audioAssets.ts）');
  }

  console.log('');
  process.exit(failedCount > 0 ? 1 : 0);
}

main().catch((err: unknown) => {
  console.error('\n❌ 腳本執行意外中斷：', err);
  process.exit(1);
});
