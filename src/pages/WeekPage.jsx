import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import VideoModal from "../components/VideoModal";
import ToastContainer from "../components/ToastContainer";

const videoLinks = {
  '0.1': '',
  '0.2': '',
  '0.3': '',
  '1.1': 'DrAC99XYRf01qCpryCQgdWsSTLzkSJRt79Gw9ssR02ZsM',
  '1.2': 'DUvRjeJLjzC006aigFlu3ASvjNbxNktIoiIhz7El2nBM',
  '1.3': 'UOsbflwxWzstD8WQExStPbfr1arhQHvGWmWVfQZM015g',
  // ... add your actual playback IDs for each lesson
};

function getWatchedLessons() {
  try { return JSON.parse(localStorage.getItem("shadowx-watched") || "{}"); }
  catch { return {}; }
}
function setWatchedLessons(val) {
  localStorage.setItem("shadowx-watched", JSON.stringify(val));
}

export default function WeekPage() {
  const { weekNumber } = useParams();
  const navigate = useNavigate();
  const [modal, setModal] = useState({open: false, videoId: null, title: ""});
  const [watched, setWatched] = useState(getWatchedLessons());
  const [toasts, setToasts] = useState([]);

  const lessons = [1,2,3];

  const openModal = (videoId, title) => setModal({open:true, videoId, title});
  const closeModal = () => setModal({open:false, videoId:null, title:""});

  // For progress tracking
  const handleWatched = useCallback(() => {
    const [wk, ls] = modal.videoId.split(".");
    setWatched(prev => {
      const updated = {...prev, [wk]: {...(prev[wk]||{}), [ls]: true }};
      setWatchedLessons(updated);
      return updated;
    });
    setToasts(ts => [...ts, {id:Date.now(), message:"Lesson marked as watched! 🎉"}]);
    closeModal();
  }, [modal.videoId]);

  const removeToast = useCallback((id) => setToasts(ts => ts.filter(t => t.id !== id)), []);

  useEffect(() => {
    setWatched(getWatchedLessons());
  }, [weekNumber]);

  return (
    <div className="container fade-in">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div style={{marginBottom: 30}}>
        <button onClick={() => navigate(-1)} style={{
          color:'#a0aec0', fontSize:'1rem', marginBottom: 12,
          display:'inline-flex', alignItems:'center', gap:6
        }}>
          <span style={{fontSize:18,marginRight:2}}>&larr;</span> Back to Courses
        </button>
        <h2 style={{fontSize:"1.6rem", fontWeight: 700}}>
          {`Week ${weekNumber} - ${weekNumber === "0" ? "Warming Up" : `Week ${weekNumber}`}`}
        </h2>
      </div>
      <div className="grid lessons">
        {lessons.map((j, idx) => {
          const videoId = `${weekNumber}.${j}`;
          const title = `Week ${weekNumber}.${j} - Lesson ${j}`;
          const done = watched && watched[weekNumber] && watched[weekNumber][j];
          return (
            <div className="card" key={videoId} style={{animationDelay: `${idx * 0.06}s`}}
              onClick={()=>openModal(videoId, title)}>
              <div className="card-header">
                <div className="card-label">
                  shadowX
                  {done && <span className="progress-dot done" title="Watched"></span>}
                </div>
                <div className="card-title">{`Week ${weekNumber}.${j}`}</div>
              </div>
              <div className="card-main">
                <div className="card-title" style={{fontSize:'1.1rem'}}>{title}</div>
                <div className="card-desc">{done ? "Watched 🎉" : "Click to play video"}</div>
              </div>
              <span style={{
                position:'absolute',right:14,bottom:14,background:'var(--card-bg)',borderRadius:'50%',padding:8
              }}>
                <svg className="play-icon" width="22" height="22" viewBox="0 0 20 20" fill="#fff"><polygon points="7,5 16,10 7,15"/></svg>
              </span>
            </div>
          );
        })}
      </div>
      <VideoModal
        open={modal.open}
        onClose={closeModal}
        playbackId={videoLinks[modal.videoId]}
        title={modal.title}
        onWatched={handleWatched}
      />
    </div>
  );
}
