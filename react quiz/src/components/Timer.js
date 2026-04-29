import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

function Timer() {
  const { remainingTime, status, timerMode, dispatch } = useQuiz();

  const isUnlimited = timerMode === "unlimited" || remainingTime === null;
  const mins = isUnlimited ? 0 : Math.floor(remainingTime / 60);
  const secs = isUnlimited ? 0 : remainingTime % 60;

  useEffect(() => {
    if (status !== "active" || isUnlimited) return;

    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch, status, isUnlimited, remainingTime]);

  // If unlimited mode, don't render the timer
  if (isUnlimited) {
    return null;
  }

  return (
    <div
      className={`timer ${remainingTime <= 30 ? "timer-warning" : ""}`}
      role="timer"
      aria-live="polite"
      aria-label={`Time remaining: ${mins} minutes and ${secs} seconds`}
    >
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default Timer;
