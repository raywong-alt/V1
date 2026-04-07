import { CATEGORY_LABELS } from '../data/static';
import { AgeGroup, Category, RecommendationResult, TargetArea } from '../types';

const weakCategoryRules: Record<Category, { main: string; secondary: string }> = {
  letters: { main: 'Cambridge 認字記憶班', secondary: '親子英文故事班' },
  picture: { main: 'Cambridge 認字記憶班', secondary: '親子英文故事班' },
  phonics: { main: '家長英語拼音基礎課', secondary: 'Phonics拼讀之旅' },
  blend: { main: 'Phonics拼讀之旅', secondary: '家長英語拼音基礎課' },
  dictation: { main: '親子英語寫作班', secondary: '家長英語拼音基礎課' },
};

const routeByTargetArea = (targetArea: TargetArea, ageGroup: AgeGroup) => {
  if (targetArea === '開學') {
    return ageGroup === '1-2' || ageGroup === '3-4'
      ? { main: '升K相關課程', secondary: '' }
      : { main: '升小相關課程', secondary: '' };
  }

  if (targetArea === '學習記憶') {
    return { main: 'Cambridge 認字記憶班', secondary: '兒童高效記憶家長課' };
  }

  if (ageGroup === '1-2') {
    return { main: '1-3歲學前專注力基礎課', secondary: '3-6歲專注力提升手冊' };
  }

  return { main: '3-6歲專注力基礎課程', secondary: '3-6歲專注力提升手冊' };
};

export const buildRecommendations = (params: {
  targetArea: TargetArea;
  ageGroup: AgeGroup;
  weakestCategory: Category;
  totalPercentage: number;
}): RecommendationResult => {
  const routed = routeByTargetArea(params.targetArea, params.ageGroup);
  const weakRule = weakCategoryRules[params.weakestCategory];

  const mainRecommendation = routed.main;
  const secondaryRecommendation =
    routed.secondary ||
    (weakRule.main !== mainRecommendation ? weakRule.main : weakRule.secondary);

  const supplementaryRecommendations: string[] = [];
  if (params.totalPercentage >= 85) {
    supplementaryRecommendations.push('親子英文故事班', 'Phonics拼讀之旅');
  }

  const reasons = [
    `按目前分流目標「${params.targetArea}」，先以「${mainRecommendation}」作主軸，方向會較清晰。`,
    `孩子在「${CATEGORY_LABELS[params.weakestCategory]}」仍有補強空間，配合「${secondaryRecommendation}」可更有系統地建立信心。`,
  ];

  return {
    mainRecommendation,
    secondaryRecommendation,
    supplementaryRecommendations,
    reasons,
  };
};
