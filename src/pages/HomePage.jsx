import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";

function getWatchedLessons() {
  try { return JSON.parse(localStorage.getItem("shadowx-watched") || "{}"); }
  catch { return {}; }
}

export default function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const watched = useMemo(getWatchedLessons, []);
  const weeks = Array.from({length:38}).map((_, i) => i);

  const filteredWeeks = weeks.filter(i => {
    if (search.trim() === "") return true;
    const label = i === 0 ? "Warming Up" : `Week ${i}`;
    return label.toLowerCase().includes(search.trim().toLowerCase());
  });

  return (
    <div className="container fade-in">
      <header style={{marginBottom: 32}}>
        <h1 style={{fontSize: '2.2rem', fontWeight: 800}}>Courses</h1>
        <p style={{color: '#7fa7e2', fontSize: '1.1rem', marginTop: 10}}>0-100 Cohort | <span style={{fontWeight:600, color:'#3b82f6'}}>shadowX</span></p>
      </header>
      <SearchBar value={search} onChange={setSearch} placeholder="Search week..." />
      <div className="grid weeks">
        {filteredWeeks.map((i, idx) => {
          const weekKey = `${i}`;
          const done = watched && watched[weekKey] && Object.values(watched[weekKey]).filter(Boolean).length === 3;
          return (
            <div className="card" key={i} style={{animationDelay: `${idx * 0.04}s`}} onClick={() => navigate(`/week/${i}`)}>
              <div className="card-header">
                <div className="card-label">shadowX {done && <span className="progress-dot done" title="Completed"></span>}</div>
                <div className="card-title">{i === 0 ? "Warming Up" : `Week ${i}`}</div>
              </div>
              <div className="card-main">
                <div className="card-title" style={{fontSize:'1.1rem'}}>{i === 0 ? "Warming Up" : `Week ${i}`}</div>
                <div className="card-desc">Core curriculum</div>
              </div>
            </div>
          );
        })}
        {filteredWeeks.length === 0 && <div style={{color:"#a0aec0",padding:"40px 0",fontSize:"1.2rem"}}>No weeks found.</div>}
      </div>
    </div>
  );
}