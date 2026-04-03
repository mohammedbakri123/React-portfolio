import { useQuiz } from "../context/QuizContext";

function StatsScreen() {
  const { stats, quizHistory, achievements, ACHIEVEMENTS, dispatch } = useQuiz();

  const accuracy = stats.totalQuestions > 0
    ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100)
    : 0;

  const avgScore = stats.totalQuizzes > 0
    ? Math.round(stats.totalPoints / stats.totalQuizzes)
    : 0;

  const allAchievementsList = Object.values(ACHIEVEMENTS);
  const earnedIds = achievements.map((a) => a.id);

  return (
    <div className="stats-screen">
      <h2>Your Statistics</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">🎯</span>
          <span className="stat-value">{stats.totalQuizzes}</span>
          <span className="stat-label">Quizzes Completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">❓</span>
          <span className="stat-value">{stats.totalQuestions}</span>
          <span className="stat-label">Questions Answered</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <span className="stat-value">{accuracy}%</span>
          <span className="stat-label">Accuracy</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <span className="stat-value">{stats.totalPoints}</span>
          <span className="stat-label">Total Points</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📈</span>
          <span className="stat-value">{avgScore}</span>
          <span className="stat-label">Avg Score</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🔥</span>
          <span className="stat-value">{stats.bestStreak}</span>
          <span className="stat-label">Best Streak</span>
        </div>
      </div>

      <div className="achievements-section">
        <h3>Achievements ({achievements.length}/{allAchievementsList.length})</h3>
        <div className="achievements-grid">
          {allAchievementsList.map((achievement) => {
            const isEarned = earnedIds.includes(achievement.id);
            return (
              <div
                key={achievement.id}
                className={`achievement-card ${isEarned ? "earned" : "locked"}`}
              >
                <span className="achievement-icon">{achievement.icon}</span>
                <span className="achievement-name">{achievement.name}</span>
                <span className="achievement-desc">{achievement.description}</span>
              </div>
            );
          })}
        </div>
      </div>

      {quizHistory.length > 0 && (
        <div className="history-full">
          <h3>Quiz History</h3>
          <div className="history-table">
            {quizHistory.map((entry, index) => (
              <div key={index} className="history-row">
                <span>{new Date(entry.date).toLocaleDateString()}</span>
                <span className="history-score-cell">
                  {entry.score}/{entry.maxScore}
                </span>
                <span className={`history-percentage ${entry.percentage >= 80 ? "high" : entry.percentage >= 50 ? "medium" : "low"}`}>
                  {entry.percentage}%
                </span>
                <span>{entry.streak > 0 && `🔥${entry.streak}`}</span>
              </div>
            ))}
          </div>
          <button
            className="btn-link danger"
            onClick={() => dispatch({ type: "clearHistory" })}
          >
            Clear History
          </button>
        </div>
      )}

      <button
        className="btn btn-back"
        onClick={() => dispatch({ type: "restart" })}
      >
        ← Back to Quiz
      </button>
    </div>
  );
}

export default StatsScreen;
