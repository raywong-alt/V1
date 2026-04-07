import { AssessmentResult, TargetArea } from '../types';
import { CATEGORY_LABELS } from '../data/static';

const levelGuides: Record<AssessmentResult['level'], string> = {
  'Level 1': '先以每日 10 分鐘短練習為主，重點建立聽音與辨字習慣。',
  'Level 2': '建議每週固定 3 至 4 次練習，逐步把基礎穩定下來。',
  'Level 3': '可在現有基礎上加入小挑戰，讓孩子保持投入與成就感。',
  'Level 4': '可安排進階活動，同時保留遊戲化方式維持學習興趣。',
};

const targetGuides: Record<TargetArea, string> = {
  開學: '配合開學節奏，建議把英語練習放在固定作息時段。',
  學習記憶: '可多用圖像配對和口語複述，幫助孩子記得更牢。',
  專注力: '建議採用短回合任務，先穩定專注再慢慢延長時間。',
};

export const buildParentAdvice = (params: {
  result: AssessmentResult;
  targetArea: TargetArea;
}): string => {
  const weakLabel = CATEGORY_LABELS[params.result.weakestCategory];

  return `${levelGuides[params.result.level]} 目前可優先加強「${weakLabel}」，每天用聽音跟讀、看圖配對等輕鬆活動練 1 至 2 回合。${targetGuides[params.targetArea]}`;
};
