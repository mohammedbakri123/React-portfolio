import { useQuiz } from "../context/QuizContext";

function ThemeToggle() {
  const { theme, dispatch } = useQuiz();

  return (
    <button
      className="btn-theme"
      onClick={() => dispatch({ type: "toggleTheme" })}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeToggle;
