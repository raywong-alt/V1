import fs from 'fs';
import path from 'path';
import https from 'https';
import { ttsConfig } from './tts-config.js';

// ── XML / SSML 工具 ───────────────────────────────────────────────

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function pause(ms: number): string {
  return `<break time="${ms}ms"/>`;
}

function prosody(rate: string, inner: string): string {
  return `<prosody rate="${rate}">${inner}</prosody>`;
}

function sayAsChars(text: string): string {
  return `<say-as interpret-as="characters">${escapeXml(text)}</say-as>`;
}

// ── SSML 生成 ─────────────────────────────────────────────────────

export function buildSSML(params: {
  audioLabel: string;
  category: string;
  voice: string;
  lang: string;
}): string {
  const { audioLabel, category, voice, lang } = params;
  const label = audioLabel.trim();
  const rate = ttsConfig.speakingRates[category] ?? ttsConfig.speakingRates.default;

  let innerContent: string;

  switch (category) {
    case 'letters': {
      // 字母辨識：用 say-as characters 確保逐字母朗讀，加入短停頓
      const spokenChar = sayAsChars(label);
      innerContent =
        prosody(rate, spokenChar) +
        pause(ttsConfig.pauseMs.short) +
        prosody(rate, spokenChar);
      break;
    }

    case 'phonics': {
      // 發音規則：單字母用 characters，字母組合或單詞則直接朗讀
      const isShortPhoneme = label.length <= 2;
      const spoken = isShortPhoneme
        ? prosody(rate, sayAsChars(label))
        : prosody(rate, escapeXml(label));
      innerContent = spoken;
      break;
    }

    case 'blend': {
      // 拼讀組合：慢速朗讀整體，加入前導停頓讓小朋友準備
      innerContent =
        pause(ttsConfig.pauseMs.short) +
        prosody(rate, escapeXml(label));
      break;
    }

    case 'dictation': {
      // 聽寫拼字：朗讀兩次，中間加較長停頓
      const spoken = prosody(rate, escapeXml(label));
      const repeats = Array(ttsConfig.dictationRepeatCount).fill(spoken);
      innerContent = repeats.join(pause(ttsConfig.pauseMs.long));
      break;
    }

    default: {
      innerContent = prosody(rate, escapeXml(label));
    }
  }

  const voiceBlock = `<voice name="${voice}">${innerContent}</voice>`;

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<speak version="1.0"`,
    `  xmlns="http://www.w3.org/2001/10/synthesis"`,
    `  xmlns:mstts="http://www.w3.org/2001/mstts"`,
    `  xml:lang="${lang}">`,
    voiceBlock,
    `</speak>`,
  ].join('\n');
}

// ── Azure TTS REST API ────────────────────────────────────────────

export interface AzureCredentials {
  key: string;
  region: string;
}

export function callAzureTTS(ssml: string, creds: AzureCredentials): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const ssmlBuffer = Buffer.from(ssml, 'utf8');

    const options: https.RequestOptions = {
      hostname: `${creds.region}.tts.speech.microsoft.com`,
      path: '/cognitiveservices/v1',
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': creds.key,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': ttsConfig.outputFormat,
        'User-Agent': 'KidsEnglishAssessmentTTS/1.0',
        'Content-Length': ssmlBuffer.length,
      },
    };

    const req = https.request(options, (res) => {
      const chunks: Buffer[] = [];
      res.on('data', (chunk: Buffer) => chunks.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(chunks);
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body);
        } else {
          reject(
            new Error(
              `Azure TTS 回應錯誤 (HTTP ${res.statusCode}): ${body.toString('utf8').slice(0, 200)}`,
            ),
          );
        }
      });
      res.on('error', reject);
    });

    req.on('error', reject);
    req.write(ssmlBuffer);
    req.end();
  });
}

// ── 檔案工具 ──────────────────────────────────────────────────────

export function toSafeFilename(id: string): string {
  // question id 格式為 "3-4-letters-1" — 本身安全，但仍做保護性處理
  return id.replace(/[^a-zA-Z0-9\-_]/g, '_');
}

export function getAudioOutputPath(ageGroup: string, category: string, questionId: string): string {
  const filename = `${toSafeFilename(questionId)}.mp3`;
  return path.join(ttsConfig.outputDir, ageGroup, category, filename);
}

export function getPublicAudioUrl(ageGroup: string, category: string, questionId: string): string {
  const filename = `${toSafeFilename(questionId)}.mp3`;
  return `/audio/${ageGroup}/${category}/${filename}`;
}

export async function ensureDir(dirPath: string): Promise<void> {
  await fs.promises.mkdir(dirPath, { recursive: true });
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── 掃描現有音檔（從 public/audio/ 目錄重建 map）────────────────

export async function scanExistingAudioFiles(): Promise<Record<string, string>> {
  const map: Record<string, string> = {};
  const baseDir = ttsConfig.outputDir;

  try {
    const ageDirs = await fs.promises.readdir(baseDir, { withFileTypes: true });
    for (const ageEntry of ageDirs) {
      if (!ageEntry.isDirectory()) continue;
      const ageGroup = ageEntry.name;

      const catDirs = await fs.promises.readdir(path.join(baseDir, ageGroup), { withFileTypes: true });
      for (const catEntry of catDirs) {
        if (!catEntry.isDirectory()) continue;
        const category = catEntry.name;

        const files = await fs.promises.readdir(
          path.join(baseDir, ageGroup, category),
          { withFileTypes: true },
        );
        for (const fileEntry of files) {
          if (!fileEntry.isFile() || !fileEntry.name.endsWith('.mp3')) continue;
          const key = fileEntry.name.replace('.mp3', '');
          map[key] = `/audio/${ageGroup}/${category}/${fileEntry.name}`;
        }
      }
    }
  } catch {
    // 目錄尚未建立，返回空 map
  }

  return map;
}

// ── audioAssets.ts 生成器 ─────────────────────────────────────────

export function generateAudioAssetsSource(assetsMap: Record<string, string>): string {
  const sorted = Object.entries(assetsMap).sort(([a], [b]) => a.localeCompare(b));

  const entries = sorted
    .map(([key, url]) => `  '${key}': '${url}',`)
    .join('\n');

  const count = sorted.length;
  const timestamp = new Date().toISOString().slice(0, 10);

  return `// AUTO-GENERATED by scripts/generate-tts.ts
// 最後更新：${timestamp}（共 ${count} 個音檔映射）
// 重新執行 npm run tts:generate 可更新此檔案，請勿手動編輯生成區塊。

export const AUDIO_ASSETS: Record<string, string | null> = {
${entries}
};

export const resolveAudioSrc = (audioKey: string | null): string | null => {
  if (!audioKey) return null;
  return AUDIO_ASSETS[audioKey] ?? null;
};
`;
}
