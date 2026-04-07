# TTS 系統交接筆記 — 幼兒英語評估 App

整理日期：2026-04-08

---

## 一、已可自動生成音檔的題目

以下 **60 題**（4 類別 × 5 年齡層 × 3 題）均可由腳本自動生成：

| 類別 | 年齡層 | 題數 | 備注 |
|------|--------|------|------|
| letters（字母辨識） | 1-2, 3-4, 4-5, 5-6, 6+ | 3×5=15 | 逐字母朗讀兩次 |
| phonics（發音規則） | 1-2, 3-4, 4-5, 5-6, 6+ | 3×5=15 | 短音節用 say-as，長單詞直讀 |
| blend（拼讀組合） | 1-2, 3-4, 4-5, 5-6, 6+ | 3×5=15 | 慢速朗讀整個詞 |
| dictation（聽寫拼字） | 1-2, 3-4, 4-5, 5-6, 6+ | 3×5=15 | 重複兩次，中間有 1200ms 停頓 |

**不生成**：picture（看圖識字）15 題 — 這些是圖片題，無音訊需求。

---

## 二、音檔 key 對應規則

- question ID 格式：`{ageGroup}-{category}-{index}`
  - 例如：`3-4-letters-1`、`5-6-dictation-2`
- 音檔輸出路徑：`public/audio/{ageGroup}/{category}/{id}.mp3`
  - 例如：`public/audio/3-4/letters/3-4-letters-1.mp3`
- 前端 URL：`/audio/{ageGroup}/{category}/{id}.mp3`

---

## 三、SSML 設計說明

| 類別 | SSML 策略 | 語速 |
|------|-----------|------|
| letters | `say-as interpret-as="characters"` + 重複兩次 | 0.75 |
| phonics | ≤2字元用 `say-as`，否則直讀 | 0.82 |
| blend | 加前導 pause + 慢速直讀 | 0.78 |
| dictation | 重複兩次 + `<break time="1200ms"/>` | 0.80 |

修改語速：編輯 `scripts/tts-config.ts` 中的 `speakingRates`。

---

## 四、前端 fallback 機制

若某題目的音檔尚未生成（`AUDIO_ASSETS` 無對應 key），前端的 `playQuestionAudio`（App.tsx）會自動 fallback 至：

```typescript
window.speechSynthesis.speak(new SpeechSynthesisUtterance(question.audioLabel))
```

即使用瀏覽器 TTS 朗讀 `audioLabel`（英文字母/單詞）。這個 fallback 是有意設計，可在正式音檔生成前保持功能可用。

---

## 五、如何替換 voice

編輯 `scripts/tts-config.ts`：

```typescript
export const ttsConfig = {
  englishVoice: 'en-US-AnaNeural',      // ← 改這裡換英文 voice
  chineseVoice: 'zh-HK-HiuMaanNeural', // ← 改這裡換廣東話 voice
  // ...
};
```

然後重新執行：
```bash
npm run tts:generate -- --force
```

可選英文 voice：
- `en-US-AnaNeural`（預設，兒童友好）
- `en-US-AriaNeural`
- `en-US-JennyNeural`
- `en-GB-SoniaNeural`（英式發音）

可選廣東話 voice：
- `zh-HK-HiuMaanNeural`（女聲，預設）
- `zh-HK-WanLungNeural`（男聲）
- `zh-HK-HiuGaaiNeural`（女聲，另一選擇）

---

## 六、仍屬 Placeholder / Future Work

### 6.1 中文指示音訊（未實作）
目前只生成英文內容（`audioLabel`）的音訊。若需要把中文題目指示（`questionText`）也加入音訊，可在 `tts-utils.ts` 的 `buildSSML` 中加入：

```typescript
// 例如：先讀中文指示，再讀英文內容（兩個 voice block）
const chineseBlock = `<voice name="${ttsConfig.chineseVoice}">${escapeXml(questionText)}</voice>`;
const englishBlock = `<voice name="${ttsConfig.englishVoice}">...</voice>`;
```

### 6.2 CI/CD 自動生成
目前需要本地手動執行腳本。可在 GitHub Actions 加入步驟：

```yaml
- name: Generate TTS audio
  env:
    AZURE_SPEECH_KEY: ${{ secrets.AZURE_SPEECH_KEY }}
    AZURE_SPEECH_REGION: ${{ secrets.AZURE_SPEECH_REGION }}
  run: npm run tts:generate
```

### 6.3 音檔版本管理
目前音檔不提交到 git（`.gitignore` 已排除 `public/audio/`）。
可考慮：
- 放到 Azure Blob Storage / CDN
- 放到 GitHub Releases
- 提交小批次（移除 .gitignore 中的 `public/audio/`）

### 6.4 品質檢查
目前未有自動品質驗證。可考慮加入：
- 音訊時長檢查（太短可能出錯）
- 檔案大小檢查（0 bytes = 生成失敗）

---

## 七、執行方式快速參考

```bash
# 首次設定
cp .env.example .env
# 填入 AZURE_SPEECH_KEY 和 AZURE_SPEECH_REGION

npm install

# 預覽（不實際生成）
npm run tts:generate:dry-run
npm run tts:generate -- --dry-run --category=letters

# 正式生成
npm run tts:generate                          # 全量（跳過已存在）
npm run tts:generate -- --force               # 全量強制覆寫
npm run tts:generate -- --category=dictation  # 只生成 dictation
npm run tts:generate -- --age=4-5             # 只生成 4-5 歲
npm run tts:generate -- --category=letters --age=3-4 --force
```

生成完成後，`src/assets/audio/audioAssets.ts` 會自動更新，前端即可讀取正式音檔。

---

*本文件由 AI 工程助手整理，2026-04-08*
