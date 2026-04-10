# 幼兒英語評估工具 (Xaris Kids English Assessment)

Xaris Academy / 恩道教育 — 幼兒英語能力評估 Web App,用於招生分流、評估及家長跟進。

-----

## 一、項目簡介

本系統提供幼兒(1-6+ 歲)英語能力評估流程,家長及前線同事可透過手機或 iPad 完成:

1. **分流問卷**:收集小朋友名字、年齡層、關注方向(開學 / 學習記憶 / 專注力)
1. **英文背景問卷**:了解現有英語學習狀況
1. **評估測驗**:支援綜合測驗(full)或單類測驗(single),共 5 個類別
- 字母認識 (letters)
- 字母發音 (phonics)
- 拼音組合 (blend)
- 看圖識字 (picture)
- 聽寫辨字 (dictation)
1. **結果分析**:即時顯示總分、Level 1-4 評級、各類別分數、錯題、家長建議、分析摘要、推薦課程
1. **家長跟進**:收集家長聯絡資料,資料送至後台供跟進

-----

## 二、技術架構

|項目  |使用技術                                 |
|----|-------------------------------------|
|前端框架|React 18 + TypeScript                |
|構建工具|Vite 5                               |
|樣式  |原生 CSS(mobile-first,優先支援手機及 iPad)    |
|音訊  |HTML5 Audio + Web Speech API fallback|
|後台資料|Firebase Firestore                   |
|身份驗證|Firebase Authentication              |
|部署平台|Vercel(前台)                           |

-----

## 三、本地開發

### 前置需求

- Node.js 18 或以上
- npm

### 安裝及啟動

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置正式版本
npm run build

# 本地預覽建置結果
npm run preview
```

開發伺服器預設運行於 `http://localhost:5173`。

### 環境變量

於項目根目錄建立 `.env.local` 文件:

```
VITE_API_BASE_URL=<後端 API 或 Firebase 接口位址>
```

⚠️ **注意**:前端僅持有後端接口 URL,**不得**在前端放置任何 AI API key 或 Firebase admin key。

-----

## 四、TTS 音訊生成

系統內置題目音訊生成腳本(用於 listen 題型):

```bash
# 生成新增題目的音訊
npm run tts:generate

# 強制重新生成全部音訊
npm run tts:generate:force

# 試行模式(不實際生成)
npm run tts:generate:dry-run
```

> TTS 生成須要於 `.env.local` 配置對應 API 憑證。音訊檔案生成後會儲存於 public 資料夾,供前端引用。

-----

## 五、部署

### 前台(Vercel)

1. 將代碼 push 到 GitHub
1. Vercel 會自動偵測並部署
1. 於 Vercel 專案設定中配置 `VITE_API_BASE_URL` 環境變量
1. 目前線上位址:https://v1-seven-lovat.vercel.app/

### 後台(Firebase)

> **待補充**:Firestore 規則、Admin 登入流程、管理介面位址將於 Firebase 設置完成後補上。

-----

## 六、後台使用說明

> **待補充**(Firebase 設置完成後填入)

計劃提供以下功能:

- Admin 登入(Firebase Authentication)
- 查看全部提交紀錄(列表)
- 查看個別紀錄詳情
- 按年齡層、Level、日期、類別篩選
- 資料匯出

-----

## 七、項目結構

```
.
├── src/
│   ├── App.tsx              # 主應用及狀態流程
│   ├── main.tsx             # 入口
│   ├── styles.css           # 全局樣式
│   ├── types.ts             # TypeScript 型別定義
│   ├── data/
│   │   ├── static.ts        # 問卷、類別標籤
│   │   └── questionBank.ts  # 題庫
│   └── logic/
│       ├── scoring.ts       # 計分及分流邏輯
│       ├── recommendation.ts # 課程推薦邏輯
│       ├── parentAdvice.ts  # 家長建議生成
│       ├── aiSummary.ts     # 分析摘要生成(規則式模板)
│       └── payload.ts       # 提交資料組裝
├── scripts/
│   └── generate-tts.ts      # TTS 音訊生成腳本
├── public/                  # 靜態資源(音訊、圖片)
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

-----

## 八、評級邏輯說明

|總分範圍   |Level  |描述    |
|-------|-------|------|
|0-49%  |Level 1|需加強基礎 |
|50-69% |Level 2|基礎建立中 |
|70-84% |Level 3|符合同齡水平|
|85-100%|Level 4|高於同齡水平|

-----

## 九、注意事項

1. **分析摘要說明**:系統顯示之「分析」為根據評估結果及年齡層生成之規則式模板內容,**非接入外部 AI 服務**。如日後需接入 AI 服務,須另行評估。
1. **題目語言**:評估題目包含英文題(letters / phonics / blend)及中文提示題(picture / dictation),UI 介面以繁體中文呈現。
1. **第三方服務費用**:Firebase、Vercel 等第三方服務費用由 Xaris Academy 承擔;建議由 Xaris Academy 直接開設相關帳戶。
1. **資料私隱**:系統收集兒童及家長資料,須遵守相關私隱條例,僅用於評估及招生跟進用途。

-----

## 十、聯絡

開發方:卓樂資訊有限公司  
項目版本:V1.0
