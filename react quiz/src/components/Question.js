import { useQuiz } from "../context/QuizContext";
import Options from "./Options";

function Question() {
  const { filteredQuestions, currentQuestionIndex, answer, status } = useQuiz();
  const question = filteredQuestions[currentQuestionIndex];
  const hasAnswered = answer !== null;
  const isReviewMode = status === "review";

  if (!question) return null;

  return (
    <div className="question">
      <div className="question-header">
        <span className={`difficulty-badge difficulty-${question.difficulty}`}>
          {question.difficulty}
        </span>
        <span className="points-badge">{question.points} pts</span>
      </div>
      <h4>{question.question}</h4>
      <Options question={question} />
      {(hasAnswered || isReviewMode) && question.explanation && (
        <div className="explanation">
          <strong>Explanation:</strong> {question.explanation}
        </div>
      )}
    </div>
  );
}

export default Question;
