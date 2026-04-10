import { useEffect, useMemo, useRef, useState } from 'react';
import { QUESTIONNAIRE, CATEGORY_LABELS } from './data/static';
import { buildQuizQuestions } from './data/questionBank';
import { generateAiSummaryPlaceholder } from './logic/aiSummary';
import { buildParentAdvice } from './logic/parentAdvice';
import { buildSavePayload } from './logic/payload';
import { buildRecommendations } from './logic/recommendation';
import { calculateAssessmentResult } from './logic/scoring';
import {
  AGE_GROUPS,
  AssessmentQuestion,
  AssessmentResult,
  Category,
  ChildProfile,
  CATEGORIES,
  IntakeFormData,
  QuizAttempt,
  SavePayload,
  TARGET_AREAS,
  TestMode,
} from './types';

type Stage = 'start' | 'questionnaire_profile' | 'questionnaire_detail' | 'mode' | 'quiz' | 'result';

const emptyProfile: ChildProfile = {
  childName: '',
  ageGroup: '3-4',
  targetArea: '開學',
};

const CATEGORY_UI: Record<Category, { icon: string; title: string; desc: string }> = {
  letters: { icon: '🔤', title: '字母認識', desc: '聽音辨認字母' },
  phonics: { icon: '🗣️', title: '字母發音', desc: '字母與發音配對' },
  blend: { icon: '🧩', title: '拼音組合', desc: '聽音拼讀單詞' },
  picture: { icon: '🖼️', title: '看圖識字', desc: '看圖配對詞彙' },
  dictation: { icon: '✏️', title: '聽寫辨字', desc: '聽音找正確拼法' },
};

const LEVEL_LABELS: Record<AssessmentResult['level'], string> = {
  'Level 1': 'Level 1：需加強基礎',
  'Level 2': 'Level 2：基礎建立中',
  'Level 3': 'Level 3：符合同齡水平',
  'Level 4': 'Level 4：高於同齡水平',
};

const App = () => {
  const [stage, setStage] = useState<Stage>('start');
  const [intake, setIntake] = useState<IntakeFormData>({
    profile: emptyProfile,
    questionnaireAnswers: {},
  });
  const [testMode, setTestMode] = useState<TestMode>('full');
  const [singleCategory, setSingleCategory] = useState<Category>('letters');

  const [quizQuestions, setQuizQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizSelections, setQuizSelections] = useState<Record<string, number>>({});
  const [playingQuestionId, setPlayingQuestionId] = useState<string | null>(null);

  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [completionTime, setCompletionTime] = useState<string>('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [followUpHint, setFollowUpHint] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const profile = intake.profile;
  const questionnaireAnswers = intake.questionnaireAnswers;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentSelection = currentQuestion ? quizSelections[currentQuestion.id] : undefined;

  const aiSummary = useMemo(() => {
    if (!result) return '';
    return generateAiSummaryPlaceholder({
      result,
      targetArea: profile.targetArea,
      childName: profile.childName,
    });
  }, [profile.childName, profile.targetArea, result]);

  const recommendation = useMemo(() => {
    if (!result) return null;

    return buildRecommendations({
      targetArea: profile.targetArea,
      ageGroup: profile.ageGroup,
      weakestCategory: result.weakestCategory,
      totalPercentage: result.totalPercentage,
    });
  }, [profile.ageGroup, profile.targetArea, result]);

  const parentAdvice = useMemo(() => {
    if (!result) return '';
    return buildParentAdvice({
      result,
      targetArea: profile.targetArea,
    });
  }, [profile.targetArea, result]);

  const payloadForSave = useMemo<SavePayload | null>(() => {
    if (!result || !recommendation || !completionTime) return null;

    return buildSavePayload({
      childName: profile.childName,
      ageGroup: profile.ageGroup,
      targetArea: profile.targetArea,
      questionnaireAnswers,
      result,
      parentAdvice,
      aiAnalysisText: aiSummary,
      recommendation,
      parentInfo: {
        parentName,
        parentPhone,
      },
      completedAt: completionTime,
    });
  }, [
    aiSummary,
    completionTime,
    parentAdvice,
    parentName,
    parentPhone,
    profile.ageGroup,
    profile.childName,
    profile.targetArea,
    questionnaireAnswers,
    recommendation,
    result,
  ]);

  const testedCategories = useMemo(() => {
    if (!result) return [] as Category[];
    return CATEGORIES.filter((category) => result.categoryScores[category].total > 0);
  }, [result]);

  const stopAudioPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    window.speechSynthesis?.cancel();
    setPlayingQuestionId(null);
  };

  const playQuestionAudio = (question: AssessmentQuestion) => {
    if (question.questionType !== 'listen') return;

    stopAudioPlayback();

    if (question.audioSrc) {
      const audio = new Audio(question.audioSrc);
      audioRef.current = audio;
      setPlayingQuestionId(question.id);
      audio.onended = () => { if (audioRef.current === audio) { audioRef.current = null; setPlayingQuestionId(null); } };
      audio.onerror = () => { if (audioRef.current === audio) { audioRef.current = null; setPlayingQuestionId(null); } };
      audio.play().catch(() => { if (audioRef.current === audio) { audioRef.current = null; setPlayingQuestionId(null); } });
      return;
    }

    if (question.audioLabel && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(question.audioLabel);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      setPlayingQuestionId(question.id);
      utterance.onend = () => setPlayingQuestionId(null);
      utterance.onerror = () => setPlayingQuestionId(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    stopAudioPlayback();
  }, [currentQuestionIndex, stage]);

  useEffect(() => {
    return () => {
      stopAudioPlayback();
    };
  }, []);

  const startQuiz = () => {
    const questions = buildQuizQuestions({
      ageGroup: profile.ageGroup,
      mode: testMode,
      singleCategory: testMode === 'single' ? singleCategory : undefined,
      seed: `${profile.childName}-${Date.now()}`,
    });

    setQuizQuestions(questions);
    setQuizSelections({});
    setCurrentQuestionIndex(0);
    setPlayingQuestionId(null);
    setResult(null);
    setCompletionTime('');
    setFollowUpHint('');
    setStage('quiz');
  };

  const finishQuiz = () => {
    const attempts: QuizAttempt[] = quizQuestions.map((question) => {
      const selectedIndex = quizSelections[question.id] ?? -1;
      return {
        questionId: question.id,
        selectedIndex,
        isCorrect: selectedIndex === question.correctIndex,
      };
    });

    const calculated = calculateAssessmentResult(quizQuestions, attempts);
    setResult(calculated);
    setCompletionTime(new Date().toISOString());
    setStage('result');
  };

  const handleFinalizeFollowUp = async () => {
    if (!payloadForSave) return;

    setIsSubmitting(true);
    setFollowUpHint('資料傳送中，請稍候...');

    // 前端只持有後端接口 URL，不持有任何 AI API key
    // 後端（或 serverless function）負責處理 AI 呼叫與資料儲存
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    try {
      const response = await fetch(`${apiBaseUrl}/api/assessment/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadForSave),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      setFollowUpHint('✅ 評估結果與跟進資料已成功送出！');
    } catch (error) {
      console.error('Failed to submit follow-up payload:', error);
      setFollowUpHint('❌ 資料送出失敗，請檢查網路連線或稍後再試。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetToHome = () => {
    setStage('start');
    setIntake({
      profile: emptyProfile,
      questionnaireAnswers: {},
    });
    setTestMode('full');
    setSingleCategory('letters');
    setQuizQuestions([]);
    setCurrentQuestionIndex(0);
    setQuizSelections({});
    setPlayingQuestionId(null);
    setResult(null);
    setCompletionTime('');
    setParentName('');
    setParentPhone('');
    setFollowUpHint('');
  };

  const retake = () => {
    setStage('mode');
    setQuizQuestions([]);
    setQuizSelections({});
    setCurrentQuestionIndex(0);
    setPlayingQuestionId(null);
    setResult(null);
    setParentName('');
    setParentPhone('');
    setCompletionTime('');
    setFollowUpHint('');
  };

  const canMoveProfileStep = profile.childName.trim().length > 0;
  const canMoveFromQuestionnaire = QUESTIONNAIRE.every((q) => questionnaireAnswers[q.id]);

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div>
          <h1>幼兒英語評估工具</h1>
          <p>Xaris Academy / 恩道教育</p>
        </div>
        <div className="tag">iPad 橫向流程版</div>
      </header>

      <main className="panel">
        {stage === 'start' && (
          <section className="section">
            <div className="home-hero">
              <div className="home-mascot">📚</div>
              <h2>幼兒英文能力評估</h2>
              <p>完成分流問卷與測驗後，即場查看結果、建議與課程方向。</p>
            </div>
            <button className="primary-btn" onClick={() => setStage('questionnaire_profile')}>
              開始問卷
            </button>
          </section>
        )}

        {stage === 'questionnaire_profile' && (
          <section className="section">
            <h2>分流問卷（1/2）</h2>
            <label className="field">
              <span>小朋友名字</span>
              <input
                value={profile.childName}
                onChange={(e) =>
                  setIntake((prev) => ({
                    ...prev,
                    profile: { ...prev.profile, childName: e.target.value },
                  }))
                }
                placeholder="請輸入小朋友名字"
              />
            </label>

            <div className="field">
              <span>1. 小朋友年齡</span>
              <div className="chip-grid">
                {AGE_GROUPS.map((age) => (
                  <button
                    key={age}
                    className={profile.ageGroup === age ? 'chip active' : 'chip'}
                    onClick={() =>
                      setIntake((prev) => ({
                        ...prev,
                        profile: { ...prev.profile, ageGroup: age },
                      }))
                    }
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <span>2. 你而家最想針對小朋友加強邊一方面？</span>
              <div className="chip-grid">
                {TARGET_AREAS.map((item) => (
                  <button
                    key={item}
                    className={profile.targetArea === item ? 'chip active' : 'chip'}
                    onClick={() =>
                      setIntake((prev) => ({
                        ...prev,
                        profile: { ...prev.profile, targetArea: item },
                      }))
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="row-actions">
              <button className="ghost-btn" onClick={resetToHome}>
                回首頁
              </button>
              <button
                className="primary-btn"
                onClick={() => setStage('questionnaire_detail')}
                disabled={!canMoveProfileStep}
              >
                下一步：英文背景問卷
              </button>
            </div>
          </section>
        )}

        {stage === 'questionnaire_detail' && (
          <section className="section">
            <h2>英文背景問卷（2/2）</h2>
            {QUESTIONNAIRE.map((q, index) => (
              <article key={q.id} className="question-card">
                <h3>
                  {index + 1}. {q.text}
                </h3>
                <div className="option-grid">
                  {q.options.map((opt) => (
                    <button
                      key={opt.value}
                      className={questionnaireAnswers[q.id] === opt.value ? 'option active' : 'option'}
                      onClick={() =>
                        setIntake((prev) => ({
                          ...prev,
                          questionnaireAnswers: {
                            ...prev.questionnaireAnswers,
                            [q.id]: opt.value,
                          },
                        }))
                      }
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </article>
            ))}

            <div className="row-actions">
              <button className="ghost-btn" onClick={() => setStage('questionnaire_profile')}>
                上一步
              </button>
              <button
                className="primary-btn"
                onClick={() => setStage('mode')}
                disabled={!canMoveFromQuestionnaire}
              >
                下一步：選擇測驗模式
              </button>
            </div>
          </section>
        )}

        {stage === 'mode' && (
          <section className="section">
            <h2>測驗模式</h2>
            <div className="mode-row">
              <button
                className={testMode === 'single' ? 'mode-btn active' : 'mode-btn'}
                onClick={() => setTestMode('single')}
              >
                單類測驗（single）
              </button>
              <button
                className={testMode === 'full' ? 'mode-btn active' : 'mode-btn'}
                onClick={() => setTestMode('full')}
              >
                綜合測驗（full）
              </button>
            </div>

            {testMode === 'single' && (
              <div className="field">
                <span>請選擇單類測驗類別</span>
                <div className="category-grid">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      className={singleCategory === category ? 'category-card active' : 'category-card'}
                      onClick={() => setSingleCategory(category)}
                    >
                      <span className="category-icon">{CATEGORY_UI[category].icon}</span>
                      <strong>{CATEGORY_UI[category].title}</strong>
                      <small>{CATEGORY_UI[category].desc}</small>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="info-box">
              <p>
                題庫來源：{profile.ageGroup} 年齡層。{testMode === 'full' ? '將覆蓋多個類別能力。' : '只測所選單一類別。'}
              </p>
            </div>

            <div className="row-actions">
              <button className="ghost-btn" onClick={() => setStage('questionnaire_detail')}>
                上一步
              </button>
              <button className="primary-btn" onClick={startQuiz}>
                開始作答
              </button>
            </div>
          </section>
        )}

        {stage === 'quiz' && currentQuestion && (
          <section className="section">
            <h2>評估作答中</h2>
            <p className="progress">
              第 {currentQuestionIndex + 1} / {quizQuestions.length} 題 - 類別：
              {CATEGORY_LABELS[currentQuestion.category]}
            </p>

            <article className="question-card quiz-layout">
              <div className="quiz-question-pane">
                <h3>{currentQuestion.questionText}</h3>
                <span className="question-type-tag">
                  {currentQuestion.questionType === 'listen' ? '聽音題' : '看圖題'}
                </span>

                {currentQuestion.questionType === 'listen' ? (
                  <div className="placeholder-box media-box audio-box">
                    <p className="meta">音訊提示：{currentQuestion.audioLabel || '音訊題'}</p>
                    <button
                      className="audio-btn big-audio-btn"
                      onClick={() => playQuestionAudio(currentQuestion)}
                    >
                      {playingQuestionId === currentQuestion.id ? '播放中...' : '點擊播放音訊'}
                    </button>
                    {!currentQuestion.audioSrc && (
                      <p className="meta">目前未上傳音訊檔，已保留播放位供後續素材接入。</p>
                    )}
                  </div>
                ) : (
                  <div className="placeholder-box media-box image-box">
                    <p className="meta">圖片提示：{currentQuestion.imageLabel || '圖片題'}</p>
                    {currentQuestion.imageSrc ? (
                      <img
                        className="question-image"
                        src={currentQuestion.imageSrc}
                        alt={currentQuestion.imageLabel || currentQuestion.questionText}
                      />
                    ) : (
                      <div className="image-placeholder image-placeholder-large">圖片素材待接入</div>
                    )}
                  </div>
                )}
              </div>

              <div className="quiz-option-pane option-grid single-col">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={`${currentQuestion.id}-${option}`}
                    className={currentSelection === index ? 'option active' : 'option'}
                    onClick={() =>
                      setQuizSelections((prev) => ({
                        ...prev,
                        [currentQuestion.id]: index,
                      }))
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </article>

            <div className="row-actions">
              <button
                className="ghost-btn"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              >
                上一題
              </button>

              {currentQuestionIndex < quizQuestions.length - 1 ? (
                <button
                  className="primary-btn"
                  disabled={currentSelection === undefined}
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                >
                  下一題
                </button>
              ) : (
                <button className="primary-btn" disabled={currentSelection === undefined} onClick={finishQuiz}>
                  完成評估
                </button>
              )}
            </div>
          </section>
        )}

        {stage === 'result' && result && recommendation && (
          <section className="section">
            <h2>評估結果</h2>

            <div className="result-block">
              <h3>1. 總分 %</h3>
              <p className="big-score">{result.totalPercentage}%</p>
            </div>

            <div className="result-block">
              <h3>2. 四級評級</h3>
              <p>{LEVEL_LABELS[result.level]}</p>
            </div>

            <div className="result-block">
              <h3>3. 各類別分數</h3>
              <div className="score-grid">
                {testedCategories.map((category) => {
                  const row = result.categoryScores[category];
                  return (
                    <div key={category} className="score-item">
                      <strong>{CATEGORY_LABELS[category]}</strong>
                      <span>{`${row.percentage}% (${row.correct}/${row.total})`}</span>
                    </div>
                  );
                })}
              </div>
              {testMode === 'single' && <p className="meta">此結果為單類測驗分數。</p>}
            </div>

            <div className="result-block">
              <h3>4. 錯題區</h3>
              {result.wrongQuestions.length === 0 ? (
                <p>沒有錯題，表現很棒。</p>
              ) : (
                <div className="wrong-list">
                  {result.wrongQuestions.map((item, idx) => (
                    <div key={item.question.id} className="wrong-item">
                      <p>
                        {idx + 1}. [{CATEGORY_LABELS[item.question.category]}] {item.question.questionText}
                      </p>
                      <p>你的答案：{item.question.options[item.selectedIndex]}</p>
                      <p>正確答案：{item.question.options[item.question.correctIndex]}</p>
                      <p className="meta">
                        題型：{item.question.questionType === 'listen' ? '音訊題' : '圖片題'}
                        {item.question.questionType === 'listen'
                          ? `（${item.question.audioLabel || '音訊提示'}）`
                          : `（${item.question.imageLabel || '圖片提示'}）`}
                      </p>
                      {item.question.questionType === 'picture' && (
                        <div className="wrong-media-preview">
                          {item.question.imageSrc ? (
                            <img
                              className="wrong-image-thumb"
                              src={item.question.imageSrc}
                              alt={item.question.imageLabel || item.question.questionText}
                            />
                          ) : (
                            <div className="image-placeholder">圖片素材待接入</div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="result-block">
              <h3>5. 家長建議</h3>
              <p>{parentAdvice}</p>
            </div>

            <div className="result-block">
              <h3>6. 評估分析</h3>
              <p>{aiSummary}</p>
            </div>

            <div className="result-block">
              <h3>7. 推薦課程</h3>
              <p>主推薦：{recommendation.mainRecommendation}</p>
              <p>次推薦：{recommendation.secondaryRecommendation}</p>
              {recommendation.supplementaryRecommendations.length > 0 && (
                <p>高表現補充：{recommendation.supplementaryRecommendations.join('、')}</p>
              )}
            </div>

            <div className="result-block">
              <h3>8. 推薦課程原因</h3>
              <div className="reason-list">
                {recommendation.reasons.filter(Boolean).map((reason, index) => (
                  <p key={`${reason}-${index}`}>{reason}</p>
                ))}
              </div>
            </div>

            <div className="result-action-footer">
              <button className="primary-btn" onClick={retake}>再測一次</button>
              <button className="ghost-btn" onClick={resetToHome}>回首頁</button>
            </div>

            <div className="result-block parent-block follow-up-block">
              <h3>現場跟進資料（可跳過）</h3>
              <p className="meta">如需後續跟進建議，可留下聯絡資料。</p>
              <div className="two-col-input">
                <label className="field">
                  <span>家長姓名</span>
                  <input value={parentName} onChange={(e) => setParentName(e.target.value)} placeholder="可留空" />
                </label>
                <label className="field">
                  <span>家長電話</span>
                  <input value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} placeholder="可留空" />
                </label>
              </div>
              <div className="row-actions">
                <button className="ghost-btn" onClick={handleFinalizeFollowUp} disabled={isSubmitting}>
                  {isSubmitting ? '傳送中...' : '完成跟進資料整理'}
                </button>
              </div>
              {followUpHint && <p className="meta">{followUpHint}</p>}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;
