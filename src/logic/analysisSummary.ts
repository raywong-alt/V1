import { AssessmentResult, Category, TargetArea } from '../types';
import { CATEGORY_LABELS } from '../data/static';

const levelOpeners: Record<AssessmentResult['level'], string> = {
  'Level 1': '願意完成評估、認真聆聽和作答，已經是很好的起步，值得鼓勵。',
  'Level 2': '已有初步基礎，持續規律練習之下，進步幅度會愈來愈明顯。',
  'Level 3': '理解與反應能力不錯，整體表現符合同齡水平，方向正確。',
  'Level 4': '整體表現高於同齡，已具備良好的英文學習底子，可以嘗試更多挑戰。',
};

const targetAreaHints: Record<TargetArea, string> = {
  開學: '配合開學準備，建議把英語練習放入固定作息時段，讓孩子對學習節奏感到熟悉。',
  學習記憶: '針對記憶目標，可多用圖像聯想與口語複述，讓孩子在有趣的情境中反覆接觸詞彙。',
  專注力: '針對專注力目標，建議採用短回合任務，先穩定投入感，再慢慢延長每次練習時間。',
};

const topCategory = (scores: AssessmentResult['categoryScores']): Category =>
  (Object.keys(scores) as Category[]).reduce((best, current) =>
    scores[current].percentage > scores[best].percentage ? current : best,
  );

export const generateAnalysisSummary = (params: {
  result: AssessmentResult;
  targetArea: TargetArea;
  childName: string;
}): string => {
  const { result, targetArea, childName } = params;
  const strongest = topCategory(result.categoryScores);
  const weakest = result.weakestCategory;
  const name = childName.trim() || '孩子';

  return `${name}今次評估總分為 ${result.totalPercentage}%，整體評級為${result.level}。${levelOpeners[result.level]} 今次在「${CATEGORY_LABELS[strongest]}」的表現較為穩定，反映${name}已有可延伸的學習基礎，這個優勢可以在日後的學習中繼續發揮。下一步建議優先加強「${CATEGORY_LABELS[weakest]}」，每天以 10 至 15 分鐘進行聽音、看圖與親子互動遊戲，循序漸進地幫助孩子建立信心。${targetAreaHints[targetArea]} 整體而言，${name}的表現值得肯定，只要持續以鼓勵代替壓力，讓學習融入日常生活，孩子的英文自信自然會慢慢建立起來。`;
};
