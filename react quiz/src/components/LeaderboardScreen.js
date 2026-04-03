import { useState } from "react";
import { useQuiz } from "../context/QuizContext";

function LeaderboardScreen() {
  const { leaderboard, playerName, dispatch } = useQuiz();
  const [name, setName] = useState(playerName);

  function handleSaveName(e) {
    e.preventDefault();
    dispatch({ type: "setPlayerName", payload: name });
  }

  return (
    <div className="leaderboard-screen">
      <h2>🏆 Leaderboard</h2>

      <div className="player-name-section">
        <form onSubmit={handleSaveName}>
          <label htmlFor="playerName">Your Name:</label>
          <div className="name-input-group">
            <input
              type="text"
              id="playerName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              maxLength={20}
            />
            <button type="submit" className="btn btn-small">
              Save
            </button>
          </div>
        </form>
      </div>

      {leaderboard.length > 0 ? (
        <div className="leaderboard-table">
          <div className="leaderboard-header">
            <span>#</span>
            <span>Player</span>
            <span>Score</span>
            <span>%</span>
          </div>
          {leaderboard.map((entry, index) => (
            <div
              key={index}
              className={`leaderboard-row ${index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : ""}`}
            >
              <span className="rank">
                {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
              </span>
              <span className="player-name">{entry.name}</span>
              <span className="player-score">
                {entry.score}/{entry.maxScore}
              </span>
              <span className="player-percentage">{entry.percentage}%</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-leaderboard">
          <p>No scores yet!</p>
          <p>Complete a quiz to get on the leaderboard.</p>
        </div>
      )}

      {leaderboard.length > 0 && (
        <button
          className="btn-link danger"
          onClick={() => dispatch({ type: "clearLeaderboard" })}
        >
          Clear Leaderboard
        </button>
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

export default LeaderboardScreen;
