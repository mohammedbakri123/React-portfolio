import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import ReviewScreen from "./ReviewScreen";
import StatsScreen from "./StatsScreen";
import LeaderboardScreen from "./LeaderboardScreen";
import AddQuestionScreen from "./AddQuestionScreen";
import Timer from "./Timer";
import { useQuiz } from "../context/QuizContext";

function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <footer className="quiz-footer">
              <Timer />
              <NextButton />
            </footer>
          </>
        )}
        {status === "finish" && <FinishScreen />}
        {status === "review" && <ReviewScreen />}
        {status === "stats" && <StatsScreen />}
        {status === "leaderboard" && <LeaderboardScreen />}
        {status === "add-question" && <AddQuestionScreen />}
      </Main>
    </div>
  );
}

export default App;
