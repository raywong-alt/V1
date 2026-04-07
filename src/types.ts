export const AGE_GROUPS = ['1-2', '3-4', '4-5', '5-6', '6+'] as const;
export const TARGET_AREAS = ['開學', '學習記憶', '專注力'] as const;
export const CATEGORIES = ['letters', 'phonics', 'blend', 'picture', 'dictation'] as const;
export const TEST_MODES = ['single', 'full'] as const;

export type AgeGroup = (typeof AGE_GROUPS)[number];
export type TargetArea = (typeof TARGET_AREAS)[number];
export type Category = (typeof CATEGORIES)[number];
export type TestMode = (typeof TEST_MODES)[number];
export type LevelCode = 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4';

export interface QuestionnaireOption {
  value: string;
  label: string;
}

export interface QuestionnaireQuestion {
  id: string;
  text: string;
  options: QuestionnaireOption[];
}

export interface AssessmentQuestion {
  id: string;
  ageGroup: AgeGroup;
  category: Category;
  type: 'mcq';
  questionType: 'listen' | 'picture';
  questionText: string;
  options: string[];
  correctIndex: number;
  audioKey: string | null;
  audioLabel: string | null;
  audioSrc: string | null;
  imageKey: string | null;
  imageLabel: string | null;
  imageSrc: string | null;
}

export interface ChildProfile {
  childName: string;
  ageGroup: AgeGroup;
  targetArea: TargetArea;
}

export type QuestionnaireAnswers = Record<string, string>;

export interface IntakeFormData {
  profile: ChildProfile;
  questionnaireAnswers: QuestionnaireAnswers;
}

export interface QuizAttempt {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
}

export interface CategoryScore {
  correct: number;
  total: number;
  percentage: number;
}

export interface AssessmentResult {
  totalCorrect: number;
  totalQuestions: number;
  totalPercentage: number;
  level: LevelCode;
  categoryScores: Record<Category, CategoryScore>;
  wrongQuestions: Array<{
    question: AssessmentQuestion;
    selectedIndex: number;
  }>;
  weakestCategory: Category;
}

export interface RecommendationResult {
  mainRecommendation: string;
  secondaryRecommendation: string;
  supplementaryRecommendations: string[];
  reasons: string[];
}

export interface ParentInfo {
  parentName: string;
  parentPhone: string;
}

export interface SavePayload {
  childName: string;
  ageGroup: AgeGroup;
  targetArea: TargetArea;
  questionnaireAnswers: QuestionnaireAnswers;
  categoryScores: Record<Category, number>;
  totalScorePercentage: number;
  level: LevelCode;
  parentAdvice: string;
  aiAnalysisText: string;
  recommendedCourses: {
    main: string;
    secondary: string;
    supplementary: string[];
  };
  recommendationReasons: string[];
  parentInfo: ParentInfo;
  completedAt: string;
}
