export type Lesson = {
  id: number;
  courseId: number;
  title: string;
  shortTitle: string;
  description: string;
  duration: string;
  badge: string;
  isPremium: boolean;
  contentKz: string;
  contentRu: string;
  examples: {
    letter: string;
    word: string;
  }[];
};

export const lessons: Lesson[] = [
  {
    id: 1,
    courseId: 1,
    title: "Lesson 1: Alphabet",
    shortTitle: "Alphabet",
    description: "Ағылшын әріптері және айтылуы",
    duration: "15 min",
    badge: "Lesson 1",
    isPremium: false,
    contentKz:
      "Ағылшын алфавитінде 26 әріп бар. Әр әріптің өз дыбысталуы болады. Бұл сабақта негізгі әріптерді және қарапайым сөздерді жаттаймыз.",
    contentRu:
      "В английском алфавите 26 букв. У каждой буквы есть свое произношение. В этом уроке мы изучим базовые буквы и простые слова.",
    examples: [
      { letter: "A", word: "apple" },
      { letter: "B", word: "book" },
      { letter: "C", word: "cat" },
    ],
  },
  {
    id: 2,
    courseId: 1,
    title: "Lesson 2: Basic Words",
    shortTitle: "Basic Words",
    description: "Ең керек бастапқы сөздер",
    duration: "20 min",
    badge: "Lesson 2",
    isPremium: false,
    contentKz:
      "Бұл сабақта күнделікті өмірде жиі қолданылатын ағылшын сөздерін үйренеміз.",
    contentRu:
      "В этом уроке мы изучим базовые английские слова, которые часто используются в повседневной жизни.",
    examples: [
      { letter: "Hi", word: "сәлем" },
      { letter: "Book", word: "кітап" },
      { letter: "Water", word: "су" },
    ],
  },
  {
    id: 3,
    courseId: 1,
    title: "Lesson 3: Present Simple",
    shortTitle: "Present Simple",
    description: "Қарапайым осы шақ",
    duration: "25 min",
    badge: "Lesson 3",
    isPremium: true,
    contentKz:
      "Present Simple күнделікті әрекеттерді, әдеттерді және жалпы шындықтарды айту үшін қолданылады.",
    contentRu:
      "Present Simple используется для описания ежедневных действий, привычек и общих фактов.",
    examples: [
      { letter: "I", word: "study English" },
      { letter: "She", word: "likes books" },
      { letter: "They", word: "play football" },
    ],
  },
];