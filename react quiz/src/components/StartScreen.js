import { useQuiz } from "../context/QuizContext";

function StartScreen() {
  const {
    numberOfQuestions,
    availableDifficulties,
    availableCategories,
    selectedDifficulty,
    selectedCategory,
    shuffleQuestions,
    timerMode,
    quizHistory,
    stats,
    dispatch,
  } = useQuiz();

  const categoryLabels = {
    basics: "React Basics",
    components: "Components",
    state: "State Management",
    hooks: "Hooks",
    router: "React Router",
    performance: "Performance",
    advanced: "Advanced",
  };

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numberOfQuestions()} questions to test your React mastery</h3>

      <div className="quiz-settings">
        <div className="setting-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) =>
              dispatch({ type: "setCategory", payload: e.target.value })
            }
          >
            <option value="all">All Categories</option>
            {availableCategories.map((category) => (
              <option key={category} value={category}>
                {categoryLabels[category] || category}
              </option>
            ))}
          </select>
        </div>

        <div className="setting-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            value={selectedDifficulty}
            onChange={(e) =>
              dispatch({ type: "setDifficulty", payload: e.target.value })
            }
          >
            <option value="all">All Levels</option>
            {availableDifficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="setting-group">
          <label htmlFor="timer">Timer:</label>
          <select
            id="timer"
            value={timerMode}
            onChange={(e) =>
              dispatch({ type: "setTimerMode", payload: e.target.value })
            }
          >
            <option value="fast">Fast (15s)</option>
            <option value="normal">Normal (30s)</option>
            <option value="relaxed">Relaxed (60s)</option>
            <option value="unlimited">Unlimited</option>
          </select>
        </div>

        <div className="setting-group">
          <label htmlFor="shuffle">Shuffle:</label>
          <button
            id="shuffle"
            className={`btn-toggle ${shuffleQuestions ? "active" : ""}`}
            onClick={() => dispatch({ type: "toggleShuffle" })}
            aria-pressed={shuffleQuestions}
          >
            {shuffleQuestions ? "On" : "Off"}
          </button>
        </div>
      </div>

      <div className="start-actions">
        <button
          className="btn btn-ui btn-start"
          onClick={() => dispatch({ type: "start" })}
          disabled={numberOfQuestions() === 0}
        >
          {numberOfQuestions() === 0 ? "No questions available" : "Start Quiz"}
        </button>
      </div>

      <div className="start-links">
        <button
          className="btn-link"
          onClick={() => dispatch({ type: "showStats" })}
        >
          📊 Statistics
        </button>
        <button
          className="btn-link"
          onClick={() => dispatch({ type: "showLeaderboard" })}
        >
          🏆 Leaderboard
        </button>
        <button
          className="btn-link"
          onClick={() => dispatch({ type: "showAddQuestion" })}
        >
          ➕ Add Question
        </button>
      </div>

      {stats.totalQuizzes > 0 && (
        <div className="quick-stats">
          <span>🎯 {stats.totalQuizzes} quizzes</span>
          <span>✅ {Math.round((stats.correctAnswers / stats.totalQuestions) * 100) || 0}% accuracy</span>
          <span>🔥 {stats.bestStreak} best streak</span>
        </div>
      )}

      {quizHistory.length > 0 && (
        <div className="history-section">
          <h4>Recent Scores</h4>
          <ul className="history-list">
            {quizHistory.slice(0, 3).map((entry, index) => (
              <li key={index} className="history-item">
                <span className="history-date">
                  {new Date(entry.date).toLocaleDateString()}
                </span>
                <span className="history-score">
                  {entry.score}/{entry.maxScore} ({entry.percentage}%)
                </span>
                <span className="history-difficulty">
                  {entry.category === "all" ? "All" : categoryLabels[entry.category] || entry.category}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default StartScreen;
