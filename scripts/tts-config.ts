// TTS 生成設定
// 修改此檔案可調整 voice、語速、停頓等參數，無需改動 generate-tts.ts

export const ttsConfig = {
  // ── 語音設定 ──────────────────────────────────────────────────────
  // 英文題目 voice（字母、拼音、單詞）
  englishVoice: 'en-US-AnaNeural',

  // 中文指示 voice（廣東話，預留供日後混合音訊使用）
  chineseVoice: 'zh-HK-HiuMaanNeural',

  // ── 輸出格式 ──────────────────────────────────────────────────────
  // Azure 支援的音訊格式
  // 參考：https://learn.microsoft.com/azure/ai-services/speech-service/rest-text-to-speech
  outputFormat: 'audio-16khz-128kbitrate-mono-mp3' as const,

  // ── 輸出目錄 ──────────────────────────────────────────────────────
  // 相對於專案根目錄，輸出至 public/ 令 Vite 靜態服務可存取
  outputDir: 'public/audio',

  // ── 語速設定（1.0 = 正常速度）────────────────────────────────────
  speakingRates: {
    letters:   '0.75',   // 字母辨識：極慢，確保發音清晰
    phonics:   '0.82',   // 發音規則：較慢，讀音準確
    blend:     '0.78',   // 拼讀組合：慢，方便辨別音節
    dictation: '0.80',   // 聽寫拼字：稍慢，重複兩次
    picture:   '0.90',   // 圖像詞彙：接近正常（通常不用音訊）
    default:   '0.88',
  } as Record<string, string>,

  // ── 停頓時間（毫秒）──────────────────────────────────────────────
  pauseMs: {
    short:  300,   // 音節間短停頓
    medium: 800,   // 字詞間停頓
    long:   1200,  // dictation 兩次之間
  },

  // dictation 重複次數
  dictationRepeatCount: 2,

  // ── 請求設定 ──────────────────────────────────────────────────────
  // 每次 Azure API 請求之間的延遲（ms），避免觸發 rate limit
  requestDelayMs: 150,
} as const;

export type TtsSpeakingRateCategory = keyof typeof ttsConfig.speakingRates;
