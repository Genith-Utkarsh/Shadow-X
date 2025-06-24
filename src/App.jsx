import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WeekPage from "./pages/WeekPage";
import Navbar from "./components/Navbar";

function getSystemTheme() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return "dark";
  return "light";
}
export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("shadowx-theme") || getSystemTheme());
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("shadowx-theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");
  return (
    <BrowserRouter>
      <Navbar onThemeToggle={toggleTheme} theme={theme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/week/:weekNumber" element={<WeekPage />} />
      </Routes>
    </BrowserRouter>
  );
}