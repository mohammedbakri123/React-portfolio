import { useQuiz } from "../context/QuizContext";

function NextButton() {
  const { dispatch, currentQuestionIndex, numberOfQuestions, answer } = useQuiz();

  if (answer === null) return null;

  const isLastQuestion = currentQuestionIndex === numberOfQuestions() - 1;

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: isLastQuestion ? "finish" : "nextQuestion" })}
      aria-label={isLastQuestion ? "Finish quiz" : "Go to next question"}
    >
      {isLastQuestion ? "Finish" : "Next →"}
    </button>
  );
}

export default NextButton;
