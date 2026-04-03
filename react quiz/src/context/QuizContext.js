import { createContext, useContext, useEffect, useCallback, useMemo } from "react";
import { useReducer } from "react";

const QuizContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

// Timer options in seconds (0 = unlimited)
const TIMER_OPTIONS = {
  fast: 15,
  normal: 30,
  relaxed: 60,
  unlimited: 0,
};

// Achievement definitions
const ACHIEVEMENTS = {
  first_quiz: { id: "first_quiz", name: "First Steps", description: "Complete your first quiz", icon: "🎯" },
  perfect_score: { id: "perfect_score", name: "Perfectionist", description: "Get 100% on a quiz", icon: "🏆" },
  speed_demon: { id: "speed_demon", name: "Speed Demon", description: "Complete a quiz in fast mode", icon: "⚡" },
  dedicated: { id: "dedicated", name: "Dedicated Learner", description: "Complete 10 quizzes", icon: "📚" },
  hard_master: { id: "hard_master", name: "Hard Master", description: "Get 80%+ on hard difficulty", icon: "🔥" },
  streak_3: { id: "streak_3", name: "On Fire", description: "Answer 3 questions correctly in a row", icon: "🔥" },
  streak_5: { id: "streak_5", name: "Unstoppable", description: "Answer 5 questions correctly in a row", icon: "💪" },
  all_categories: { id: "all_categories", name: "Well Rounded", description: "Complete a quiz in every category", icon: "🌟" },
};

// LocalStorage helpers
function getStoredValue(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStoredValue(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage not available
  }
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const initialState = {
  questions: [],
  customQuestions: getStoredValue("react-quiz-custom-questions", []),
  filteredQuestions: [],
  currentQuestionIndex: 0,
  status: "loading", // 'loading', 'error', 'ready', 'active', 'finish', 'review', 'stats', 'leaderboard', 'add-question'
  answer: null,
  answers: [],
  points: 0,
  highScore: getStoredValue("react-quiz-highscore", 0),
  remainingTime: null,
  currentStreak: 0,
  bestStreak: 0,
  // Settings
  selectedDifficulty: "all",
  selectedCategory: "all",
  shuffleQuestions: false,
  timerMode: "normal", // fast, normal, relaxed, unlimited
  // Theme
  theme: getStoredValue("react-quiz-theme", "dark"),
  // History & Stats
  quizHistory: getStoredValue("react-quiz-history", []),
  stats: getStoredValue("react-quiz-stats", {
    totalQuizzes: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    totalPoints: 0,
    bestStreak: 0,
    categoriesPlayed: [],
  }),
  // Leaderboard
  leaderboard: getStoredValue("react-quiz-leaderboard", []),
  playerName: getStoredValue("react-quiz-player-name", ""),
  // Achievements
  achievements: getStoredValue("react-quiz-achievements", []),
  newAchievements: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived": {
      const allQuestions = [...action.payload, ...state.customQuestions];
      return {
        ...state,
        questions: allQuestions,
        filteredQuestions: allQuestions,
        status: "ready",
      };
    }
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "setDifficulty": {
      const difficulty = action.payload;
      let filtered = state.questions;
      if (difficulty !== "all") {
        filtered = filtered.filter((q) => q.difficulty === difficulty);
      }
      if (state.selectedCategory !== "all") {
        filtered = filtered.filter((q) => q.category === state.selectedCategory);
      }
      return {
        ...state,
        selectedDifficulty: difficulty,
        filteredQuestions: filtered,
      };
    }
    case "setCategory": {
      const category = action.payload;
      let filtered = state.questions;
      if (category !== "all") {
        filtered = filtered.filter((q) => q.category === category);
      }
      if (state.selectedDifficulty !== "all") {
        filtered = filtered.filter((q) => q.difficulty === state.selectedDifficulty);
      }
      return {
        ...state,
        selectedCategory: category,
        filteredQuestions: filtered,
      };
    }
    case "setTimerMode":
      return {
        ...state,
        timerMode: action.payload,
      };
    case "toggleShuffle":
      return {
        ...state,
        shuffleQuestions: !state.shuffleQuestions,
      };
    case "toggleTheme": {
      const newTheme = state.theme === "dark" ? "light" : "dark";
      setStoredValue("react-quiz-theme", newTheme);
      return {
        ...state,
        theme: newTheme,
      };
    }
    case "setPlayerName":
      setStoredValue("react-quiz-player-name", action.payload);
      return {
        ...state,
        playerName: action.payload,
      };
    case "start": {
      const questionsToUse = state.shuffleQuestions
        ? shuffleArray(state.filteredQuestions)
        : state.filteredQuestions;
      const secsPerQuestion = TIMER_OPTIONS[state.timerMode];
      return {
        ...state,
        status: "active",
        filteredQuestions: questionsToUse,
        remainingTime: secsPerQuestion === 0 ? null : questionsToUse.length * secsPerQuestion,
        answers: new Array(questionsToUse.length).fill(null),
        currentStreak: 0,
        bestStreak: 0,
        points: 0,
        currentQuestionIndex: 0,
        answer: null,
      };
    }
    case "newAnswer": {
      const question = state.filteredQuestions[state.currentQuestionIndex];
      const isCorrect = action.payload === question.correctOption;
      const newStreak = isCorrect ? state.currentStreak + 1 : 0;
      const newBestStreak = Math.max(state.bestStreak, newStreak);
      const newAnswers = [...state.answers];
      newAnswers[state.currentQuestionIndex] = action.payload;
      return {
        ...state,
        answer: action.payload,
        answers: newAnswers,
        points: isCorrect ? state.points + question.points : state.points,
        currentStreak: newStreak,
        bestStreak: newBestStreak,
      };
    }
    case "nextQuestion":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answer: null,
      };
    case "finish": {
      const maxPoints = state.filteredQuestions.reduce((sum, q) => sum + q.points, 0);
      const percentage = Math.round((state.points / maxPoints) * 100);
      const newHighScore = state.points > state.highScore ? state.points : state.highScore;
      setStoredValue("react-quiz-highscore", newHighScore);

      // Update stats
      const correctCount = state.answers.filter(
        (ans, idx) => ans === state.filteredQuestions[idx]?.correctOption
      ).length;
      const newStats = {
        totalQuizzes: state.stats.totalQuizzes + 1,
        totalQuestions: state.stats.totalQuestions + state.filteredQuestions.length,
        correctAnswers: state.stats.correctAnswers + correctCount,
        totalPoints: state.stats.totalPoints + state.points,
        bestStreak: Math.max(state.stats.bestStreak, state.bestStreak),
        categoriesPlayed: [...new Set([...state.stats.categoriesPlayed, state.selectedCategory])],
      };
      setStoredValue("react-quiz-stats", newStats);

      // Add to history
      const historyEntry = {
        date: new Date().toISOString(),
        score: state.points,
        maxScore: maxPoints,
        percentage,
        difficulty: state.selectedDifficulty,
        category: state.selectedCategory,
        questionsCount: state.filteredQuestions.length,
        streak: state.bestStreak,
      };
      const newHistory = [historyEntry, ...state.quizHistory].slice(0, 20);
      setStoredValue("react-quiz-history", newHistory);

      // Check achievements
      const newAchievements = [];
      const earnedIds = state.achievements.map((a) => a.id);

      if (!earnedIds.includes("first_quiz")) {
        newAchievements.push({ ...ACHIEVEMENTS.first_quiz, earnedAt: new Date().toISOString() });
      }
      if (percentage === 100 && !earnedIds.includes("perfect_score")) {
        newAchievements.push({ ...ACHIEVEMENTS.perfect_score, earnedAt: new Date().toISOString() });
      }
      if (state.timerMode === "fast" && !earnedIds.includes("speed_demon")) {
        newAchievements.push({ ...ACHIEVEMENTS.speed_demon, earnedAt: new Date().toISOString() });
      }
      if (newStats.totalQuizzes >= 10 && !earnedIds.includes("dedicated")) {
        newAchievements.push({ ...ACHIEVEMENTS.dedicated, earnedAt: new Date().toISOString() });
      }
      if (state.selectedDifficulty === "hard" && percentage >= 80 && !earnedIds.includes("hard_master")) {
        newAchievements.push({ ...ACHIEVEMENTS.hard_master, earnedAt: new Date().toISOString() });
      }
      if (state.bestStreak >= 3 && !earnedIds.includes("streak_3")) {
        newAchievements.push({ ...ACHIEVEMENTS.streak_3, earnedAt: new Date().toISOString() });
      }
      if (state.bestStreak >= 5 && !earnedIds.includes("streak_5")) {
        newAchievements.push({ ...ACHIEVEMENTS.streak_5, earnedAt: new Date().toISOString() });
      }

      const allAchievements = [...state.achievements, ...newAchievements];
      setStoredValue("react-quiz-achievements", allAchievements);

      return {
        ...state,
        status: "finish",
        highScore: newHighScore,
        quizHistory: newHistory,
        stats: newStats,
        achievements: allAchievements,
        newAchievements,
      };
    }
    case "addToLeaderboard": {
      const entry = {
        name: state.playerName || "Anonymous",
        score: state.points,
        maxScore: state.filteredQuestions.reduce((sum, q) => sum + q.points, 0),
        percentage: Math.round(
          (state.points / state.filteredQuestions.reduce((sum, q) => sum + q.points, 0)) * 100
        ),
        date: new Date().toISOString(),
        difficulty: state.selectedDifficulty,
        category: state.selectedCategory,
      };
      const newLeaderboard = [...state.leaderboard, entry]
        .sort((a, b) => b.percentage - a.percentage || b.score - a.score)
        .slice(0, 10);
      setStoredValue("react-quiz-leaderboard", newLeaderboard);
      return {
        ...state,
        leaderboard: newLeaderboard,
      };
    }
    case "clearLeaderboard":
      setStoredValue("react-quiz-leaderboard", []);
      return {
        ...state,
        leaderboard: [],
      };
    case "review":
      return {
        ...state,
        status: "review",
        currentQuestionIndex: 0,
      };
    case "reviewNext":
      return {
        ...state,
        currentQuestionIndex: Math.min(
          state.currentQuestionIndex + 1,
          state.filteredQuestions.length - 1
        ),
      };
    case "reviewPrev":
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      };
    case "showStats":
      return {
        ...state,
        status: "stats",
      };
    case "showLeaderboard":
      return {
        ...state,
        status: "leaderboard",
      };
    case "showAddQuestion":
      return {
        ...state,
        status: "add-question",
      };
    case "addCustomQuestion": {
      const newQuestion = { ...action.payload, id: Date.now(), isCustom: true };
      const newCustomQuestions = [...state.customQuestions, newQuestion];
      const allQuestions = [...state.questions.filter((q) => !q.isCustom), ...newCustomQuestions];
      setStoredValue("react-quiz-custom-questions", newCustomQuestions);
      return {
        ...state,
        customQuestions: newCustomQuestions,
        questions: allQuestions,
        filteredQuestions: allQuestions,
        status: "ready",
      };
    }
    case "deleteCustomQuestion": {
      const newCustomQuestions = state.customQuestions.filter((q) => q.id !== action.payload);
      const allQuestions = [...state.questions.filter((q) => !q.isCustom), ...newCustomQuestions];
      setStoredValue("react-quiz-custom-questions", newCustomQuestions);
      return {
        ...state,
        customQuestions: newCustomQuestions,
        questions: allQuestions,
        filteredQuestions: allQuestions,
      };
    }
    case "restart":
      return {
        ...state,
        currentQuestionIndex: 0,
        status: "ready",
        answer: null,
        answers: [],
        points: 0,
        remainingTime: null,
        currentStreak: 0,
        bestStreak: 0,
        newAchievements: [],
      };
    case "tick":
      return {
        ...state,
        remainingTime: state.remainingTime - 1,
        status: state.remainingTime === 0 ? "finish" : state.status,
      };
    case "retry":
      return {
        ...state,
        status: "loading",
      };
    case "clearHistory":
      setStoredValue("react-quiz-history", []);
      return {
        ...state,
        quizHistory: [],
      };
    case "clearAchievements":
      setStoredValue("react-quiz-achievements", []);
      return {
        ...state,
        achievements: [],
      };
    case "dismissNewAchievements":
      return {
        ...state,
        newAchievements: [],
      };
    default:
      return state;
  }
}

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    customQuestions,
    filteredQuestions,
    currentQuestionIndex,
    status,
    answer,
    answers,
    points,
    highScore,
    remainingTime,
    currentStreak,
    bestStreak,
    selectedDifficulty,
    selectedCategory,
    shuffleQuestions,
    timerMode,
    theme,
    quizHistory,
    stats,
    leaderboard,
    playerName,
    achievements,
    newAchievements,
  } = state;

  const fetchQuestions = useCallback(() => {
    fetch(`${API_URL}/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const maxPossiblePoints = useCallback(() => {
    return filteredQuestions.reduce((prev, curr) => prev + curr.points, 0);
  }, [filteredQuestions]);

  const numberOfQuestions = useCallback(() => {
    return filteredQuestions.length;
  }, [filteredQuestions]);

  // Get unique difficulties from questions
  const availableDifficulties = useMemo(() => {
    const difficulties = [...new Set(questions.map((q) => q.difficulty))];
    return difficulties.filter(Boolean).sort((a, b) => {
      const order = { easy: 1, medium: 2, hard: 3 };
      return (order[a] || 99) - (order[b] || 99);
    });
  }, [questions]);

  // Get unique categories from questions
  const availableCategories = useMemo(() => {
    const categories = [...new Set(questions.map((q) => q.category))];
    return categories.filter(Boolean).sort();
  }, [questions]);

  // Generate share text
  const getShareText = useCallback(() => {
    const percentage = Math.round((points / maxPossiblePoints()) * 100);
    return `I scored ${points}/${maxPossiblePoints()} (${percentage}%) on the React Quiz! Can you beat my score? 🎯`;
  }, [points, maxPossiblePoints]);

  // Get seconds per question based on timer mode
  const secsPerQuestion = TIMER_OPTIONS[timerMode];

  return (
    <QuizContext.Provider
      value={{
        questions,
        customQuestions,
        filteredQuestions,
        currentQuestionIndex,
        status,
        answer,
        answers,
        points,
        highScore,
        remainingTime,
        currentStreak,
        bestStreak,
        selectedDifficulty,
        selectedCategory,
        shuffleQuestions,
        timerMode,
        theme,
        quizHistory,
        stats,
        leaderboard,
        playerName,
        achievements,
        newAchievements,
        dispatch,
        maxPossiblePoints,
        numberOfQuestions,
        fetchQuestions,
        availableDifficulties,
        availableCategories,
        getShareText,
        secsPerQuestion,
        TIMER_OPTIONS,
        ACHIEVEMENTS,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}

export { QuizProvider, useQuiz };
