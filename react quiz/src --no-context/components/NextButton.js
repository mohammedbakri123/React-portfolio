function NextButton({
  dispatch,
  answer,
  numberOfQuestions,
  currentQuestionIndex,
}) {
  if (answer === null) return;

  if (currentQuestionIndex === numberOfQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        finish
      </button>
    );
  }

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
}

export default NextButton;
