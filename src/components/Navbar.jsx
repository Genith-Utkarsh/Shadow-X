import logo from "../assets/logo.svg";
export default function Navbar({ onThemeToggle, theme }) {
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <span className="logo">
          <img src={logo} alt="shadowX" width={32} height={32} style={{marginRight:8}}/>
          shadowX
        </span>
        <button className="toggle-btn" onClick={onThemeToggle} title="Toggle theme">
          {theme === "dark" ? "🌙" : "🌞"}
        </button>
      </div>
    </nav>
  );
}