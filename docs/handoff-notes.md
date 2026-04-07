# Handoff Notes — 幼兒英語評估 App

整理日期：2026-04-07
整理人：AI 接手工程師（Claude）

---

## 一、專案現況摘要

| 項目 | 狀態 |
|------|------|
| 目錄結構 | ✅ 已整理（src/data, src/logic, src/assets） |
| TypeScript 型別 | ✅ 完整，已補 vite-env.d.ts |
| 問卷流程 | ✅ 完整可用 |
| 評分邏輯 | ✅ 完整可用 |
| 推薦邏輯 | ✅ 完整可用 |
| 結果頁 | ✅ 完整可用 |
| 圖片資產 | ✅ 內嵌 SVG demo，可替換 |
| 音訊資產 | ⚠️ 使用 demo URL（T-Rex 音效），待換真實素材 |
| API 提交 | ⚠️ 結構正確，需後端接口才能真正運作 |
| AI 分析 | ⚠️ Placeholder 文本，非真實 AI 呼叫 |
| 後端服務 | ❌ 未實作，前端已預留接口 |

---

## 二、已完成的修正

### 2.1 安全修正（重要）
- **移除暴露的 Google Gemini API key**（原在 .env 的 `VITE_API_KEY`）
- **修正 .env 的 `VITE_API_URL`**：原本是整段 curl 指令，現改為正確格式
- 新增 `.gitignore` 防止 `.env` 被提交到版本控制
- `App.tsx` 的 API 呼叫改為使用 `VITE_API_BASE_URL`，不再持有 AI key

### 2.2 工程修正
- 新增 `src/vite-env.d.ts`，補齊 `import.meta.env.VITE_*` TypeScript 型別宣告
- 新增 `.env.example` 作為環境變數範本
- `App.tsx handleFinalizeFollowUp`：改為 `fetch(\`${apiBaseUrl}/api/assessment/save\`)`

### 2.3 確認正常的部分（未改動，邏輯完整）
- `src/data/questionBank.ts`：5個年齡層 × 5個類別，每類3題，共75題
- `src/data/static.ts`：QUESTIONNAIRE（5題問卷）、CATEGORY_LABELS
- `src/logic/scoring.ts`：計算 totalPercentage、categoryScores、weakestCategory、level
- `src/logic/recommendation.ts`：按 targetArea + ageGroup + weakestCategory 推薦課程
- `src/logic/aiSummary.ts`：AI 分析 Placeholder 文本生成
- `src/logic/parentAdvice.ts`：家長建議文本生成
- `src/logic/payload.ts`：buildSavePayload 整合所有資料
- `src/assets/audio/audioAssets.ts`：demo 音訊 map，結構清晰易替換
- `src/assets/images/imageAssets.ts`：內嵌 SVG 圖片，結構清晰易替換

---

## 三、仍屬 Placeholder 的地方

### 3.1 音訊資產（demo）
**檔案**：`src/assets/audio/audioAssets.ts`

目前 `demo-listen-1` 和 `demo-listen-2` 都指向同一個外部 URL（MDN T-Rex 音效）。
替換方式：
```typescript
// 把以下 demo key 換成真實音訊
export const AUDIO_ASSETS: Record<string, string | null> = {
  'letters-a': '/audio/letters/a.mp3',        // 放在 public/audio/ 資料夾
  'letters-b': '/audio/letters/b.mp3',
  // ... 其他 key
};
```
音訊 key 格式建議：`${category}-${label}`，例如 `letters-a`、`phonics-cat`。

### 3.2 圖片資產（內嵌 SVG demo）
**檔案**：`src/assets/images/imageAssets.ts`

目前使用內嵌 SVG 生成 data URI，可在瀏覽器直接顯示。
如需替換成真實圖片：
```typescript
export const IMAGE_ASSETS: Record<string, string> = {
  'image-cat': '/images/cat.png',    // 放在 public/images/ 資料夾
  // ...
};
```

### 3.3 AI 分析（Placeholder 文本）
**檔案**：`src/logic/aiSummary.ts`

目前 `generateAiSummaryPlaceholder` 是純字串拼接，非真實 AI 呼叫。
要接真實 AI，有兩個方向：
- **Option A（建議）**：後端接收 payload 後，呼叫 Gemini/OpenAI，把分析結果回傳前端
- **Option B**：結果頁加載時前端呼叫後端 `/api/assessment/analyze` 接口，拿到分析文本

### 3.4 API 提交（Mock）
**檔案**：`src/App.tsx`，`handleFinalizeFollowUp` 函式

目前呼叫 `${VITE_API_BASE_URL}/api/assessment/save`，但後端未存在。
在本地開發時，如果沒有後端服務，提交會失敗（但不影響前端評估流程）。

---

## 四、目前目錄結構

```
F:/V/
  index.html              — HTML 入口
  package.json            — 套件定義
  tsconfig.json           — TypeScript 設定
  vite.config.ts          — Vite 設定
  .env                    — 本地環境變數（不提交）
  .env.example            — 環境變數範本（可提交）
  .gitignore              — Git 排除規則

  src/
    main.tsx              — React 入口
    App.tsx               — 主元件（所有 stage 邏輯）
    vite-env.d.ts         — Vite 環境變數型別宣告
    styles.css            — 全域樣式
    types.ts              — 所有共用型別定義

    data/
      questionBank.ts     — 題庫（5年齡層 × 5類別 × 3題）
      static.ts           — 問卷題目、CATEGORY_LABELS

    logic/
      scoring.ts          — 評分計算
      recommendation.ts   — 課程推薦邏輯
      aiSummary.ts        — AI 分析 placeholder
      parentAdvice.ts     — 家長建議文本
      payload.ts          — 提交 payload 組裝

    assets/
      audio/
        audioAssets.ts    — 音訊 key→URL map（demo 狀態）
      images/
        imageAssets.ts    — 圖片 key→SVG map（demo 狀態）

  docs/
    handoff-notes.md      — 本文件

  tools/                  — 本機工具（非產品核心）
```

---

## 五、下一步最建議做什麼

### 優先順序 1（安全）
- [ ] **立即吊銷已暴露的 Google Gemini API key**
  前往 https://console.cloud.google.com → APIs & Services → Credentials

### 優先順序 2（基礎運作）
- [ ] 安裝 Node.js（建議 LTS 版本）並執行 `npm install`
- [ ] 執行 `npm run dev` 確認本地可跑
- [ ] 執行 `npm run build` 確認可 build

### 優先順序 3（後端接口）
- [ ] 建立後端（或 serverless function，如 Vercel Functions / Cloudflare Workers）
- [ ] 實作 `POST /api/assessment/save` 接口接收 SavePayload
- [ ] 後端持有真實 Gemini key，處理 AI 分析呼叫
- [ ] 把分析結果存入資料庫或試算表

### 優先順序 4（真實素材）
- [ ] 錄製真實題目音訊（.mp3），放入 `public/audio/`
- [ ] 替換 `src/assets/audio/audioAssets.ts` 中的 key→URL 對應
- [ ] 製作或採購真實圖片，放入 `public/images/`
- [ ] 替換 `src/assets/images/imageAssets.ts` 中的 key→URL 對應

### 優先順序 5（題庫擴充）
- [ ] 目前每個年齡層每類只有 3 題，可按需要擴充
- [ ] 在 `src/data/questionBank.ts` 的 `byAgeCategoryDrafts` 內加題即可
- [ ] 題目 ID 自動生成為 `${ageGroup}-${category}-${index}`，穩定可靠

---

## 六、已知限制

1. **單頁 App 無路由**：重新整理會回到首頁，這是現有設計，如需保留進度可考慮加 localStorage
2. **full mode 結果頁僅顯示有作答類別**（`testedCategories` 過濾），行為正確
3. **weakestCategory 計算**：如果 single mode 只測一類，其他類別 total=0，weakest 會正確指向有作答的那類
4. **音訊播放**：同時只能播一題，切換題目或離開 quiz stage 時自動停止，行為正確
5. **SpeechSynthesis fallback**：如無 audioSrc 則用瀏覽器 TTS 播放英文，是有意設計的 fallback

---

*本文件由 AI 工程助手整理，反映 2026-04-07 當時的版本狀態。*
