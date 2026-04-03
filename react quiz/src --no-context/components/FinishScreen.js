import { type } from "@testing-library/user-event/dist/type";

function FinishScreen({ points, maxPossiblePoints, highScore, dispatch }) {
  const percentage = Math.round((points / maxPossiblePoints) * 100);
  let emoji = "😐";
  if (percentage === 100) emoji = "🏆";
  else if (percentage >= 80) emoji = "🎉";
  else if (percentage >= 50) emoji = "🙂";
  else if (percentage < 50) emoji = "😕";
  return (
    <>
      <p className="result">
        you scored{" "}
        <strong>
          {points} out of {maxPossiblePoints}({percentage}%) {emoji}
        </strong>
      </p>
      <p className="highscore">Highscores: {highScore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
