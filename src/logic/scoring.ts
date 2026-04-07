import {
  AssessmentQuestion,
  AssessmentResult,
  CATEGORIES,
  Category,
  QuizAttempt,
} from '../types';

const resolveLevel = (score: number): AssessmentResult['level'] => {
  if (score <= 49) return 'Level 1';
  if (score <= 69) return 'Level 2';
  if (score <= 84) return 'Level 3';
  return 'Level 4';
};

export const calculateAssessmentResult = (
  questions: AssessmentQuestion[],
  attempts: QuizAttempt[],
): AssessmentResult => {
  const attemptMap = new Map(attempts.map((item) => [item.questionId, item]));

  const baseScores = CATEGORIES.reduce(
    (acc, category) => {
      acc[category] = { correct: 0, total: 0, percentage: 0 };
      return acc;
    },
    {} as Record<Category, { correct: number; total: number; percentage: number }>,
  );

  const wrongQuestions: AssessmentResult['wrongQuestions'] = [];

  for (const question of questions) {
    const attempt = attemptMap.get(question.id);
    if (!attempt) continue;

    const scoreRow = baseScores[question.category];
    scoreRow.total += 1;

    if (attempt.isCorrect) {
      scoreRow.correct += 1;
    } else {
      wrongQuestions.push({ question, selectedIndex: attempt.selectedIndex });
    }
  }

  let totalCorrect = 0;
  let totalQuestions = 0;

  for (const category of CATEGORIES) {
    const row = baseScores[category];
    totalCorrect += row.correct;
    totalQuestions += row.total;
    row.percentage = row.total === 0 ? 0 : Math.round((row.correct / row.total) * 100);
  }

  const totalPercentage = totalQuestions === 0 ? 0 : Math.round((totalCorrect / totalQuestions) * 100);

  const weakestCategory = CATEGORIES.reduce((weakest, current) => {
    const weakestScore = baseScores[weakest];
    const currentScore = baseScores[current];

    if (currentScore.total === 0) return weakest;
    if (weakestScore.total === 0) return current;

    return currentScore.percentage < weakestScore.percentage ? current : weakest;
  }, CATEGORIES[0]);

  return {
    totalCorrect,
    totalQuestions,
    totalPercentage,
    level: resolveLevel(totalPercentage),
    categoryScores: baseScores,
    wrongQuestions,
    weakestCategory,
  };
};

