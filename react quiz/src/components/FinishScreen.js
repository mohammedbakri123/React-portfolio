import { useEffect, useState } from "react";
import { useQuiz } from "../context/QuizContext";

function FinishScreen() {
  const {
    points,
    maxPossiblePoints,
    highScore,
    bestStreak,
    getShareText,
    newAchievements,
    playerName,
    dispatch,
  } = useQuiz();
  const [copied, setCopied] = useState(false);
  const [showAchievements, setShowAchievements] = useState(newAchievements.length > 0);
  const [addedToLeaderboard, setAddedToLeaderboard] = useState(false);
  const percentage = Math.round((points / maxPossiblePoints()) * 100);

  let emoji = "";
  let message = "";
  if (percentage === 100) {
    emoji = "🏆";
    message = "Perfect score!";
  } else if (percentage >= 80) {
    emoji = "🎉";
    message = "Great job!";
  } else if (percentage >= 50) {
    emoji = "🙂";
    message = "Good effort!";
  } else {
    emoji = "😕";
    message = "Keep practicing!";
  }

  // Confetti effect for high scores
  useEffect(() => {
    if (percentage >= 80) {
      const confettiContainer = document.createElement("div");
      confettiContainer.className = "confetti-container";
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.animationDelay = Math.random() * 3 + "s";
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
      }
      document.body.appendChild(confettiContainer);
      return () => confettiContainer.remove();
    }
  }, [percentage]);

  function handleAddToLeaderboard() {
    dispatch({ type: "addToLeaderboard" });
    setAddedToLeaderboard(true);
  }

  async function handleShare(platform) {
    const text = getShareText();
    const url = window.location.href;

    if (platform === "copy") {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        "_blank"
      );
    } else if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        "_blank"
      );
    }
  }

  // Achievement popup
  if (showAchievements && newAchievements.length > 0) {
    return (
      <div className="achievement-popup">
        <h2>🎉 Achievement Unlocked!</h2>
        <div className="new-achievements">
          {newAchievements.map((achievement) => (
            <div key={achievement.id} className="achievement-card earned large">
              <span className="achievement-icon">{achievement.icon}</span>
              <span className="achievement-name">{achievement.name}</span>
              <span className="achievement-desc">{achievement.description}</span>
            </div>
          ))}
        </div>
        <button
          className="btn btn-ui"
          onClick={() => {
            setShowAchievements(false);
            dispatch({ type: "dismissNewAchievements" });
          }}
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="finish-screen" role="region" aria-label="Quiz results">
      <p className="result">
        <span>{emoji}</span> You scored{" "}
        <strong>
          {points} out of {maxPossiblePoints()} ({percentage}%)
        </strong>
      </p>
      <p className="result-message" aria-live="polite">
        {message}
      </p>

      <div className="finish-stats">
        <span>🔥 Streak: {bestStreak}</span>
        <span>🏆 High Score: {highScore}</span>
      </div>

      {!addedToLeaderboard && (
        <div className="leaderboard-prompt">
          <p>Add your score to the leaderboard?</p>
          <p className="player-name-display">
            Playing as: <strong>{playerName || "Anonymous"}</strong>
          </p>
          <button className="btn btn-small" onClick={handleAddToLeaderboard}>
            Add to Leaderboard
          </button>
        </div>
      )}

      {addedToLeaderboard && (
        <p className="leaderboard-added">✓ Added to leaderboard!</p>
      )}

      <div className="share-section">
        <p className="share-label">Share your score:</p>
        <div className="share-buttons">
          <button
            className="btn-share"
            onClick={() => handleShare("twitter")}
            aria-label="Share on Twitter"
          >
            𝕏
          </button>
          <button
            className="btn-share"
            onClick={() => handleShare("linkedin")}
            aria-label="Share on LinkedIn"
          >
            in
          </button>
          <button
            className="btn-share"
            onClick={() => handleShare("copy")}
            aria-label="Copy to clipboard"
          >
            {copied ? "✓" : "📋"}
          </button>
        </div>
      </div>

      <div className="finish-actions">
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "review" })}
        >
          Review Answers
        </button>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default FinishScreen;
