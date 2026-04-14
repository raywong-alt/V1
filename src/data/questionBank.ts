import { resolveAudioSrc } from '../assets/audio/audioAssets';
import { resolveImageSrc } from '../assets/images/imageAssets';
import { AgeGroup, AssessmentQuestion, Category, CATEGORIES } from '../types';

type DraftQuestion = {
  questionType: 'listen' | 'picture';
  questionText: string;
  options: string[];
  correctIndex: number;
  audioKey?: string | null;
  audioLabel?: string | null;
  imageKey?: string | null;
  imageLabel?: string | null;
};

const byAgeCategoryDrafts: Record<AgeGroup, Record<Category, DraftQuestion[]>> = {
  '1-2': {
    letters: [
      {
        questionType: 'listen',
        questionText: '聽一聽，點選字母 A。',
        options: ['A', 'B', 'C', 'D'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'A',
      },
      {
        questionType: 'listen',
        questionText: '聽一聽，點選字母 B。',
        options: ['A', 'B', 'D', 'P'],
        correctIndex: 1,
        audioKey: 'demo-listen-2',
        audioLabel: 'B',
      },
      {
        questionType: 'listen',
        questionText: '聽一聽，點選字母 C。',
        options: ['C', 'G', 'O', 'Q'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'C',
      },
    ],
    phonics: [
      {
        questionType: 'listen',
        questionText: '聽到 /a/ 音，選哪個字母？',
        options: ['A', 'E', 'I', 'O'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'a',
      },
      {
        questionType: 'listen',
        questionText: '聽到 /b/ 音，選哪個字母？',
        options: ['B', 'P', 'D', 'M'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'b',
      },
      {
        questionType: 'listen',
        questionText: '聽到 /m/ 音，選哪個字母？',
        options: ['N', 'M', 'W', 'H'],
        correctIndex: 1,
        audioKey: 'demo-listen-1',
        audioLabel: 'm',
      },
    ],
    blend: [
      {
        questionType: 'listen',
        questionText: '聽一聽，這兩個音像哪個？',
        options: ['ma', 'mi', 'mo', 'me'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'ma',
      },
      {
        questionType: 'listen',
        questionText: '聽一聽，這兩個音像哪個？',
        options: ['ba', 'be', 'bo', 'bi'],
        correctIndex: 1,
        audioKey: 'demo-listen-1',
        audioLabel: 'be',
      },
      {
        questionType: 'listen',
        questionText: '聽一聽，這兩個音像哪個？',
        options: ['do', 'da', 'de', 'du'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'do',
      },
    ],
    picture: [
      {
        questionType: 'picture',
        questionText: '這張圖是什麼？',
        options: ['cat', 'dog', 'sun', 'cup'],
        correctIndex: 0,
        imageKey: 'image-cat',
        imageLabel: 'cat',
      },
      {
        questionType: 'picture',
        questionText: '這張圖是什麼？',
        options: ['ball', 'apple', 'book', 'fish'],
        correctIndex: 1,
        imageKey: 'image-apple',
        imageLabel: 'apple',
      },
      {
        questionType: 'picture',
        questionText: '這張圖是什麼？',
        options: ['book', 'ball', 'bus', 'bag'],
        correctIndex: 1,
        imageKey: 'image-ball',
        imageLabel: 'ball',
      },
    ],
    dictation: [
      {
        questionType: 'listen',
        questionText: '聽到字母 A，選正確答案。',
        options: ['A', 'E', 'I', 'O'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'A',
      },
      {
        questionType: 'listen',
        questionText: '聽到字母 B，選正確答案。',
        options: ['D', 'P', 'B', 'R'],
        correctIndex: 2,
        audioKey: 'demo-listen-2',
        audioLabel: 'B',
      },
      {
        questionType: 'listen',
        questionText: '聽到字母 C，選正確答案。',
        options: ['G', 'C', 'Q', 'O'],
        correctIndex: 1,
        audioKey: 'demo-listen-1',
        audioLabel: 'C',
      },
    ],
  },

  '3-4': {
    letters: [
      {
        questionType: 'listen',
        questionText: '聽一聽，選出小寫 b。',
        options: ['b', 'd', 'p', 'q'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'b',
      },
      {
        questionType: 'listen',
        questionText: '聽一聽，選出小寫 d。',
        options: ['b', 'd', 'p', 'q'],
        correctIndex: 1,
        audioKey: 'demo-listen-2',
        audioLabel: 'd',
      },
      {
        questionType: 'listen',
        questionText: '聽一聽，選出大寫 M。',
        options: ['N', 'W', 'M', 'H'],
        correctIndex: 2,
        audioKey: 'demo-listen-1',
        audioLabel: 'M',
      },
    ],
    phonics: [
      {
        questionType: 'listen',
        questionText: '聽到 cat 開頭音，選哪個字母？',
        options: ['C', 'K', 'T', 'G'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'cat',
      },
      {
        questionType: 'listen',
        questionText: '聽到 sun 開頭音，選哪個字母？',
        options: ['S', 'C', 'T', 'Z'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'sun',
      },
      {
        questionType: 'listen',
        questionText: '聽到 fish 開頭音，選哪個字母？',
        options: ['P', 'F', 'V', 'H'],
        correctIndex: 1,
        audioKey: 'demo-listen-2',
        audioLabel: 'fish',
      },
    ],
    blend: [
      {
        questionType: 'listen',
        questionText: '聽到這個字，選出正確單字。',
        options: ['cat', 'cut', 'cap', 'cot'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'cat',
      },
      {
        questionType: 'listen',
        questionText: '聽到這個字，選出正確單字。',
        options: ['pig', 'peg', 'pug', 'pag'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'pig',
      },
      {
        questionType: 'listen',
        questionText: '聽到這個字，選出正確單字。',
        options: ['sun', 'son', 'sin', 'san'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'sun',
      },
    ],
    picture: [
      {
        questionType: 'picture',
        questionText: '看圖選字。',
        options: ['dog', 'cat', 'sun', 'fish'],
        correctIndex: 0,
        imageKey: 'image-dog',
        imageLabel: 'dog',
      },
      {
        questionType: 'picture',
        questionText: '看圖選字。',
        options: ['fish', 'ship', 'dish', 'frog'],
        correctIndex: 0,
        imageKey: 'image-fish',
        imageLabel: 'fish',
      },
      {
        questionType: 'picture',
        questionText: '看圖選字。',
        options: ['cup', 'cap', 'car', 'cat'],
        correctIndex: 0,
        imageKey: 'image-cup',
        imageLabel: 'cup',
      },
    ],
    dictation: [
      {
        questionType: 'listen',
        questionText: '聽到這個字，哪個拼法正確？',
        options: ['cat', 'cta', 'act', 'tac'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'cat',
      },
      {
        questionType: 'listen',
        questionText: '聽到這個字，哪個拼法正確？',
        options: ['sun', 'snu', 'sunh', 'sud'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'sun',
      },
      {
        questionType: 'listen',
        questionText: '聽到這個字，哪個拼法正確？',
        options: ['pig', 'pgi', 'ipg', 'pug'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'pig',
      },
    ],
  },

  '4-5': {
    letters: [
      {
        questionType: 'listen',
        questionText: '小寫 h 對應哪個大寫字母？',
        options: ['H', 'N', 'K', 'B'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'h',
      },
      {
        questionType: 'listen',
        questionText: '請選出小寫 p。',
        options: ['b', 'd', 'p', 'q'],
        correctIndex: 2,
        audioKey: 'demo-listen-2',
        audioLabel: 'p',
      },
      {
        questionType: 'listen',
        questionText: '請選出大寫 G。',
        options: ['C', 'G', 'Q', 'O'],
        correctIndex: 1,
        audioKey: 'demo-listen-1',
        audioLabel: 'G',
      },
    ],
    phonics: [
      {
        questionType: 'listen',
        questionText: '聽到 ship 開頭音，選哪個字母組合？',
        options: ['sh', 'ch', 'th', 'ph'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'ship',
      },
      {
        questionType: 'listen',
        questionText: '聽到 chair 開頭音，選哪個字母組合？',
        options: ['ch', 'sh', 'th', 'wh'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'chair',
      },
      {
        questionType: 'listen',
        questionText: '聽到 fish 開頭音，選哪個字母組合？',
        options: ['f', 'v', 'p', 'b'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'fish',
      },
    ],
    blend: [
      {
        questionType: 'listen',
        questionText: '聽到這個字，選出正確單字。',
        options: ['lamp', 'limp', 'lump', 'camp'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'lamp',
      },
      {
        questionType: 'listen',
        questionText: '聽到這個字，選出正確單字。',
        options: ['nest', 'next', 'rest', 'best'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'nest',
      },
      {
        questionType: 'listen',
        questionText: '聽到這個字，選出正確單字。',
        options: ['frog', 'flag', 'from', 'frag'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'frog',
      },
    ],
    picture: [
      {
        questionType: 'picture',
        questionText: '看圖選字。',
        options: ['bus', 'car', 'bike', 'van'],
        correctIndex: 0,
        imageKey: 'image-bus',
        imageLabel: 'bus',
      },
      {
        questionType: 'picture',
        questionText: '看圖選字。',
        options: ['teacher', 'doctor', 'farmer', 'chef'],
        correctIndex: 0,
        imageKey: 'image-teacher',
        imageLabel: 'teacher',
      },
      {
        questionType: 'picture',
        questionText: '看圖選字。',
        options: ['book', 'desk', 'bag', 'pen'],
        correctIndex: 0,
        imageKey: 'image-book',
        imageLabel: 'book',
      },
    ],
    dictation: [
      {
        questionType: 'listen',
        questionText: '聽到這個字，哪個拼法正確？',
        options: ['book', 'boko', 'bok', 'buck'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'book',
      },
      {
        questionType: 'listen',
        questionText: '聽到這個字，哪個拼法正確？',
        options: ['home', 'hmoe', 'hone', 'hoem'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'home',
      },
      {
        questionType: 'listen',
        questionText: '聽到這個字，哪個拼法正確？',
        options: ['fish', 'fihs', 'fsih', 'fesh'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'fish',
      },
    ],
  },

  '5-6': {
    letters: [
      {
        questionType: 'listen',
        questionText: '請選出小寫 q。',
        options: ['b', 'd', 'p', 'q'],
        correctIndex: 3,
        audioKey: 'demo-listen-1',
        audioLabel: 'q',
      },
      {
        questionType: 'listen',
        questionText: '請選出小寫 d。',
        options: ['b', 'd', 'p', 'q'],
        correctIndex: 1,
        audioKey: 'demo-listen-2',
        audioLabel: 'd',
      },
      {
        questionType: 'listen',
        questionText: '請選出小寫 m。',
        options: ['m', 'n', 'w', 'u'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'm',
      },
    ],
    phonics: [
      {
        questionType: 'listen',
        questionText: '聽到 thumb 開頭音，選哪個字母組合？',
        options: ['th', 'ch', 'sh', 'wh'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'thumb',
      },
      {
        questionType: 'listen',
        questionText: '聽到 boat 的母音，選哪個字母組合？',
        options: ['oa', 'oo', 'ai', 'ea'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'boat',
      },
      {
        questionType: 'listen',
        questionText: '聽到 rain 的母音，選哪個字母組合？',
        options: ['ai', 'oa', 'ee', 'oo'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'rain',
      },
    ],
    blend: [
      {
        questionType: 'listen',
        questionText: '聽到這個字，選出正確單字。',
        options: ['stop', 'step', 'stap', 'slop'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'stop',
      },
      {
        questionType: 'listen',
        questionText: '聽到這個字，選出正確單字。',
        options: ['frog', 'flag', 'frug', 'frag'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'frog',
      },
      {
        questionType: 'listen',
        questionText: '聽到這個字，選出正確單字。',
        options: ['milk', 'silk', 'malk', 'mulk'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'milk',
      },
    ],
    picture: [
      {
        questionType: 'picture',
        questionText: '看圖選字。',
        options: ['flower', 'tree', 'grass', 'leaf'],
        correctIndex: 0,
        imageKey: 'image-flower',
        imageLabel: 'flower',
      },
      {
        questionType: 'picture',
        questionText: '看圖選字。',
        options: ['clock', 'lock', 'sock', 'block'],
        correctIndex: 0,
        imageKey: 'image-clock',
        imageLabel: 'clock',
      },
      {
        questionType: 'picture',
        questionText: '看圖選字。',
        options: ['bird', 'fish', 'frog', 'duck'],
        correctIndex: 0,
        imageKey: 'image-bird',
        imageLabel: 'bird',
      },
    ],
    dictation: [
      {
        questionType: 'listen',
        questionText: '聽到這個字，哪個拼法正確？',
        options: ['train', 'trian', 'trane', 'tarin'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'train',
      },
      {
        questionType: 'listen',
        questionText: '聽到這個字，哪個拼法正確？',
        options: ['light', 'ligt', 'liht', 'ligh'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'light',
      },
      {
        questionType: 'listen',
        questionText: '聽到這個字，哪個拼法正確？',
        options: ['school', 'shcool', 'scool', 'schoool'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'school',
      },
    ],
  },

  '6+': {
    letters: [
      {
        questionType: 'listen',
        questionText: '聽一聽，選出小寫 g。',
        options: ['q', 'g', 'j', 'y'],
        correctIndex: 1,
        audioKey: 'demo-listen-1',
        audioLabel: 'g',
      },
      {
        questionType: 'listen',
        questionText: '聽一聽，選出小寫 u。',
        options: ['u', 'v', 'w', 'n'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'u',
      },
      {
        questionType: 'listen',
        questionText: '聽一聽，選出大寫 Y。',
        options: ['V', 'Y', 'W', 'X'],
        correctIndex: 1,
        audioKey: 'demo-listen-1',
        audioLabel: 'Y',
      },
    ],
    phonics: [
      {
        questionType: 'listen',
        questionText: '聽到 sheep 的母音，選哪個字母組合？',
        options: ['ee', 'ea', 'ai', 'oa'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'sheep',
      },
      {
        questionType: 'listen',
        questionText: '聽到 night 的主要母音，選哪個字母組合？',
        options: ['igh', 'ai', 'ee', 'ou'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'night',
      },
      {
        questionType: 'listen',
        questionText: '聽到 ship 開頭音，選哪個字母組合？',
        options: ['ch', 'sh', 'th', 'ph'],
        correctIndex: 1,
        audioKey: 'demo-listen-2',
        audioLabel: 'ship',
      },
    ],
    blend: [
      {
        questionType: 'listen',
        questionText: '聽到這個字，選出正確單字。',
        options: ['spring', 'string', 'sprang', 'sprong'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'spring',
      },
      {
        questionType: 'listen',
        questionText: '聽到這個字，選出正確單字。',
        options: ['street', 'sweet', 'sheet', 'streat'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'street',
      },
      {
        questionType: 'listen',
        questionText: '聽到這個字，選出正確單字。',
        options: ['black', 'block', 'bluck', 'blake'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'black',
      },
    ],
    picture: [
      {
        questionType: 'picture',
        questionText: '看圖選字。',
        options: ['giraffe', 'lion', 'tiger', 'zebra'],
        correctIndex: 0,
        imageKey: 'image-giraffe',
        imageLabel: 'giraffe',
      },
      {
        questionType: 'picture',
        questionText: '看圖選字。',
        options: ['piano', 'guitar', 'drum', 'violin'],
        correctIndex: 0,
        imageKey: 'image-piano',
        imageLabel: 'piano',
      },
      {
        questionType: 'picture',
        questionText: '看圖選字。',
        options: ['mountain', 'river', 'ocean', 'forest'],
        correctIndex: 0,
        imageKey: 'image-mountain',
        imageLabel: 'mountain',
      },
    ],
    dictation: [
      {
        questionType: 'listen',
        questionText: '聽到這個字，哪個拼法正確？',
        options: ['reading', 'reding', 'raeding', 'readin'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'reading',
      },
      {
        questionType: 'listen',
        questionText: '聽到這個字，哪個拼法正確？',
        options: ['bright', 'brite', 'brigt', 'brighte'],
        correctIndex: 0,
        audioKey: 'demo-listen-1',
        audioLabel: 'bright',
      },
      {
        questionType: 'listen',
        questionText: '聽到這個字，哪個拼法正確？',
        options: ['friend', 'freind', 'frend', 'frined'],
        correctIndex: 0,
        audioKey: 'demo-listen-2',
        audioLabel: 'friend',
      },
    ],
  },
};

const toQuestionObjects = (
  ageGroup: AgeGroup,
  category: Category,
  drafts: DraftQuestion[],
): AssessmentQuestion[] =>
  drafts.map((draft, index) => {
    const base = {
      id: `${ageGroup}-${category}-${index + 1}`,
      ageGroup,
      category,
      type: 'mcq' as const,
      questionType: draft.questionType,
      questionText: draft.questionText,
      options: draft.options,
      correctIndex: draft.correctIndex,
    };

    if (draft.questionType === 'listen') {
      // audioKey 使用 question ID，與 generate-tts.ts 輸出的音檔名稱一致
      // 格式：{ageGroup}-{category}-{index}，例如 3-4-letters-1
      const audioKey = base.id;
      const audioLabel = draft.audioLabel ?? `聽音題 ${index + 1}`;
      return {
        ...base,
        audioKey,
        audioLabel,
        audioSrc: resolveAudioSrc(audioKey),
        imageKey: null,
        imageLabel: null,
        imageSrc: null,
      };
    }

    const imageKey = draft.imageKey ?? null;
    const imageLabel = draft.imageLabel ?? `看圖題 ${index + 1}`;
    return {
      ...base,
      audioKey: null,
      audioLabel: null,
      audioSrc: null,
      imageKey,
      imageLabel,
      imageSrc: resolveImageSrc(imageKey, imageLabel),
    };
  });

export const QUESTION_BANK: Record<AgeGroup, Record<Category, AssessmentQuestion[]>> = {
  '1-2': {
    letters: toQuestionObjects('1-2', 'letters', byAgeCategoryDrafts['1-2'].letters),
    phonics: toQuestionObjects('1-2', 'phonics', byAgeCategoryDrafts['1-2'].phonics),
    blend: toQuestionObjects('1-2', 'blend', byAgeCategoryDrafts['1-2'].blend),
    picture: toQuestionObjects('1-2', 'picture', byAgeCategoryDrafts['1-2'].picture),
    dictation: toQuestionObjects('1-2', 'dictation', byAgeCategoryDrafts['1-2'].dictation),
  },
  '3-4': {
    letters: toQuestionObjects('3-4', 'letters', byAgeCategoryDrafts['3-4'].letters),
    phonics: toQuestionObjects('3-4', 'phonics', byAgeCategoryDrafts['3-4'].phonics),
    blend: toQuestionObjects('3-4', 'blend', byAgeCategoryDrafts['3-4'].blend),
    picture: toQuestionObjects('3-4', 'picture', byAgeCategoryDrafts['3-4'].picture),
    dictation: toQuestionObjects('3-4', 'dictation', byAgeCategoryDrafts['3-4'].dictation),
  },
  '4-5': {
    letters: toQuestionObjects('4-5', 'letters', byAgeCategoryDrafts['4-5'].letters),
    phonics: toQuestionObjects('4-5', 'phonics', byAgeCategoryDrafts['4-5'].phonics),
    blend: toQuestionObjects('4-5', 'blend', byAgeCategoryDrafts['4-5'].blend),
    picture: toQuestionObjects('4-5', 'picture', byAgeCategoryDrafts['4-5'].picture),
    dictation: toQuestionObjects('4-5', 'dictation', byAgeCategoryDrafts['4-5'].dictation),
  },
  '5-6': {
    letters: toQuestionObjects('5-6', 'letters', byAgeCategoryDrafts['5-6'].letters),
    phonics: toQuestionObjects('5-6', 'phonics', byAgeCategoryDrafts['5-6'].phonics),
    blend: toQuestionObjects('5-6', 'blend', byAgeCategoryDrafts['5-6'].blend),
    picture: toQuestionObjects('5-6', 'picture', byAgeCategoryDrafts['5-6'].picture),
    dictation: toQuestionObjects('5-6', 'dictation', byAgeCategoryDrafts['5-6'].dictation),
  },
  '6+': {
    letters: toQuestionObjects('6+', 'letters', byAgeCategoryDrafts['6+'].letters),
    phonics: toQuestionObjects('6+', 'phonics', byAgeCategoryDrafts['6+'].phonics),
    blend: toQuestionObjects('6+', 'blend', byAgeCategoryDrafts['6+'].blend),
    picture: toQuestionObjects('6+', 'picture', byAgeCategoryDrafts['6+'].picture),
    dictation: toQuestionObjects('6+', 'dictation', byAgeCategoryDrafts['6+'].dictation),
  },
};

// ---------- Seeded random (Mulberry32) ----------
const createSeededRandom = (seed: number) => {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const stringToSeed = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const seededShuffle = <T,>(array: T[], rng: () => number): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const shuffleQuestionOptions = (
  question: AssessmentQuestion,
  rng: () => number,
): AssessmentQuestion => {
  const correctAnswer = question.options[question.correctIndex];
  const shuffledOptions = seededShuffle(question.options, rng);
  const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);
  return { ...question, options: shuffledOptions, correctIndex: newCorrectIndex };
};

export const buildQuizQuestions = (params: {
  ageGroup: AgeGroup;
  mode: 'single' | 'full';
  singleCategory?: Category;
  seed?: string;
}): AssessmentQuestion[] => {
  const source = QUESTION_BANK[params.ageGroup];
  const seedString = params.seed ?? String(Date.now() + Math.random());
  const rng = createSeededRandom(stringToSeed(seedString));

  let questions: AssessmentQuestion[];

  if (params.mode === 'single') {
    if (!params.singleCategory) {
      throw new Error('single mode 需要提供 category');
    }
    questions = seededShuffle([...source[params.singleCategory]], rng);
  } else {
    const shuffledCategories = seededShuffle([...CATEGORIES], rng);
    questions = shuffledCategories.flatMap((category) =>
      seededShuffle([...source[category]], rng),
    );
  }

  return questions.map((q) => shuffleQuestionOptions(q, rng));
};
