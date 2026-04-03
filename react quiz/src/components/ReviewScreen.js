import { useQuiz } from "../context/QuizContext";
import Question from "./Question";

function ReviewScreen() {
  const { filteredQuestions, currentQuestionIndex, answers, dispatch } = useQuiz();
  const totalQuestions = filteredQuestions.length;
  const userAnswer = answers[currentQuestionIndex];
  const correctAnswer = filteredQuestions[currentQuestionIndex]?.correctOption;
  const isCorrect = userAnswer === correctAnswer;

  return (
    <div className="review-screen">
      <div className="review-header">
        <h3>Review Mode</h3>
        <p>
          Question {currentQuestionIndex + 1} of {totalQuestions}
          <span className={`review-status ${isCorrect ? "correct" : "wrong"}`}>
            {userAnswer === null
              ? "⏭️ Skipped"
              : isCorrect
              ? "✓ Correct"
              : "✗ Wrong"}
          </span>
        </p>
      </div>

      <Question />

      <div className="review-navigation">
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "reviewPrev" })}
          disabled={currentQuestionIndex === 0}
        >
          ← Previous
        </button>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "reviewNext" })}
          disabled={currentQuestionIndex === totalQuestions - 1}
        >
          Next →
        </button>
      </div>

      <button
        className="btn btn-back"
        onClick={() => dispatch({ type: "restart" })}
      >
        Back to Start
      </button>
    </div>
  );
}

export default ReviewScreen;
