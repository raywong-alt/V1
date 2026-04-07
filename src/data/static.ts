import { Category, QuestionnaireQuestion } from '../types';

export const QUESTIONNAIRE: QuestionnaireQuestion[] = [
  {
    id: 'weekly_exposure',
    text: '小朋友每星期接觸英文的時間大約有多少？',
    options: [
      { value: 'lt1', label: '少於 1 小時' },
      { value: '1to3', label: '1-3 小時' },
      { value: '3to5', label: '3-5 小時' },
      { value: 'gt5', label: '5 小時以上' },
    ],
  },
  {
    id: 'learning_place',
    text: '小朋友主要在哪裡學英文？',
    options: [
      { value: 'school', label: '幼稚園 / 學校' },
      { value: 'home', label: '家裡（家長教 / 自學）' },
      { value: 'class', label: '補習班 / 興趣班' },
      { value: 'apps', label: '英文影片 / Apps' },
    ],
  },
  {
    id: 'abc_song',
    text: '小朋友會不會唱英文 ABC 歌？',
    options: [
      { value: 'none', label: '完全不會' },
      { value: 'some', label: '會一些' },
      { value: 'full', label: '可以完整唱完' },
      { value: 'more', label: '還會其他英文歌' },
    ],
  },
  {
    id: 'self_reading',
    text: '小朋友平時會不會嘗試自己讀英文字？',
    options: [
      { value: 'no', label: '不會' },
      { value: 'sometimes', label: '偶爾會嘗試' },
      { value: 'often', label: '經常嘗試' },
      { value: 'sentence', label: '已經可以讀簡單句子' },
    ],
  },
  {
    id: 'learning_attitude',
    text: '小朋友對學英文的態度如何？',
    options: [
      { value: 'resist', label: '抗拒 / 不喜歡' },
      { value: 'low', label: '沒什麼興趣' },
      { value: 'normal', label: '一般 / 還好' },
      { value: 'love', label: '很喜歡學' },
    ],
  },
];

export const CATEGORY_LABELS: Record<Category, string> = {
  letters: '字母辨識',
  phonics: '發音規則',
  blend: '拼讀組合',
  picture: '圖像詞彙',
  dictation: '聽寫拼字',
};

