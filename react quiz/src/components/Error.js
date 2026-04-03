import { useQuiz } from "../context/QuizContext";

function Error() {
  const { fetchQuestions, dispatch } = useQuiz();

  function handleRetry() {
    dispatch({ type: "retry" });
    fetchQuestions();
  }

  return (
    <div className="error" role="alert">
      <p>
        <span>There was an error fetching questions.</span>
      </p>
      <button
        className="btn btn-ui"
        onClick={handleRetry}
        aria-label="Retry loading questions"
      >
        Try Again
      </button>
    </div>
  );
}

export default Error;
