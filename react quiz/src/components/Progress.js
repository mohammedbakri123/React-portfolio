import { useQuiz } from "../context/QuizContext";

function Progress() {
  const { currentQuestionIndex, numberOfQuestions, points, maxPossiblePoints, answer } =
    useQuiz();

  return (
    <header className="progress">
      <progress
        max={numberOfQuestions()}
        value={currentQuestionIndex + Number(answer !== null)}
        aria-label="Quiz progress"
      />
      <p>
        Question{" "}
        <strong>
          {currentQuestionIndex + 1} / {numberOfQuestions()}
        </strong>
      </p>
      <p>
        Points{" "}
        <strong>
          {points} / {maxPossiblePoints()}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
