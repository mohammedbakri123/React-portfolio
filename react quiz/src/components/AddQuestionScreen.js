import { useState } from "react";
import { useQuiz } from "../context/QuizContext";

function AddQuestionScreen() {
  const { customQuestions, dispatch } = useQuiz();
  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctOption: 0,
    points: 10,
    difficulty: "medium",
    category: "basics",
    explanation: "",
  });
  const [error, setError] = useState("");

  const categoryLabels = {
    basics: "React Basics",
    components: "Components",
    state: "State Management",
    hooks: "Hooks",
    router: "React Router",
    performance: "Performance",
    advanced: "Advanced",
  };

  function handleOptionChange(index, value) {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.question.trim()) {
      setError("Please enter a question");
      return;
    }
    if (formData.options.some((opt) => !opt.trim())) {
      setError("Please fill in all options");
      return;
    }

    dispatch({ type: "addCustomQuestion", payload: formData });

    // Reset form
    setFormData({
      question: "",
      options: ["", "", "", ""],
      correctOption: 0,
      points: 10,
      difficulty: "medium",
      category: "basics",
      explanation: "",
    });
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this question?")) {
      dispatch({ type: "deleteCustomQuestion", payload: id });
    }
  }

  return (
    <div className="add-question-screen">
      <h2>Add Custom Question</h2>

      <form onSubmit={handleSubmit} className="question-form">
        <div className="form-group">
          <label htmlFor="question">Question:</label>
          <textarea
            id="question"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            placeholder="Enter your question..."
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>Options:</label>
          {formData.options.map((option, index) => (
            <div key={index} className="option-input">
              <input
                type="radio"
                name="correctOption"
                checked={formData.correctOption === index}
                onChange={() => setFormData({ ...formData, correctOption: index })}
                id={`option-${index}`}
              />
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
              {formData.correctOption === index && (
                <span className="correct-label">✓ Correct</span>
              )}
            </div>
          ))}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="difficulty">Difficulty:</label>
            <select
              id="difficulty"
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {Object.entries(categoryLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="points">Points:</label>
            <select
              id="points"
              value={formData.points}
              onChange={(e) => setFormData({ ...formData, points: Number(e.target.value) })}
            >
              <option value={10}>10 pts</option>
              <option value={20}>20 pts</option>
              <option value={30}>30 pts</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="explanation">Explanation (optional):</label>
          <textarea
            id="explanation"
            value={formData.explanation}
            onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
            placeholder="Explain the correct answer..."
            rows={2}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="btn btn-ui">
          Add Question
        </button>
      </form>

      {customQuestions.length > 0 && (
        <div className="custom-questions-list">
          <h3>Your Custom Questions ({customQuestions.length})</h3>
          {customQuestions.map((q) => (
            <div key={q.id} className="custom-question-item">
              <p>{q.question}</p>
              <div className="custom-question-meta">
                <span className={`difficulty-badge difficulty-${q.difficulty}`}>
                  {q.difficulty}
                </span>
                <span>{categoryLabels[q.category]}</span>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(q.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="btn btn-back"
        onClick={() => dispatch({ type: "restart" })}
      >
        ← Back to Quiz
      </button>
    </div>
  );
}

export default AddQuestionScreen;
