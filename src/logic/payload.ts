import {
  AssessmentResult,
  CATEGORIES,
  Category,
  ParentInfo,
  QuestionnaireAnswers,
  RecommendationResult,
  SavePayload,
  TargetArea,
} from '../types';

export const buildSavePayload = (params: {
  childName: string;
  ageGroup: SavePayload['ageGroup'];
  targetArea: TargetArea;
  questionnaireAnswers: QuestionnaireAnswers;
  result: AssessmentResult;
  parentAdvice: string;
  analysisText: string;
  recommendation: RecommendationResult;
  parentInfo: ParentInfo;
  completedAt: string;
}): SavePayload => {
  const categoryScores = CATEGORIES.reduce(
    (acc, category) => {
      acc[category] = params.result.categoryScores[category].percentage;
      return acc;
    },
    {} as Record<Category, number>,
  );

  return {
    childName: params.childName,
    ageGroup: params.ageGroup,
    targetArea: params.targetArea,
    questionnaireAnswers: params.questionnaireAnswers,
    categoryScores,
    totalScorePercentage: params.result.totalPercentage,
    level: params.result.level,
    parentAdvice: params.parentAdvice,
    analysisText: params.analysisText,
    recommendedCourses: {
      main: params.recommendation.mainRecommendation,
      secondary: params.recommendation.secondaryRecommendation,
      supplementary: params.recommendation.supplementaryRecommendations,
    },
    recommendationReasons: params.recommendation.reasons,
    parentInfo: params.parentInfo,
    completedAt: params.completedAt,
  };
};

// TODO: connect API
// await fetch('/api/assessment/save', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(buildSavePayload(...)),
// });
