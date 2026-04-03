import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <img src="logo512.png" alt="React logo" />
        <h1>The React Quiz</h1>
      </div>
      <ThemeToggle />
    </header>
  );
}

export default Header;
