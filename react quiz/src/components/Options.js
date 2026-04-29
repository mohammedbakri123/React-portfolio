import { useQuiz } from "../context/QuizContext";

function Options({ question }) {
  const { answer, answers, currentQuestionIndex, status, dispatch } = useQuiz();
  const isReviewMode = status === "review";
  const displayAnswer = isReviewMode ? answers[currentQuestionIndex] : answer;
  const hasAnswered = displayAnswer !== null;

  function handleKeyDown(e, index) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!hasAnswered && !isReviewMode) {
        dispatch({ type: "newAnswer", payload: index });
      }
    }
  }

  return (
    <div className="options" role="group" aria-label="Answer options">
      {question.options.map((option, index) => (
        <button
          onClick={() =>
            !isReviewMode && dispatch({ type: "newAnswer", payload: index })
          }
          onKeyDown={(e) => handleKeyDown(e, index)}
          key={index}
          className={`btn btn-option ${displayAnswer === index ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered || isReviewMode}
          aria-pressed={displayAnswer === index}
          aria-label={`Option ${index + 1}: ${option}${
            hasAnswered
              ? index === question.correctOption
                ? " (Correct answer)"
                : displayAnswer === index
                ? " (Your answer - Incorrect)"
                : ""
              : ""
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
