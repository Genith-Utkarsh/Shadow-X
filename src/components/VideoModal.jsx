import { useEffect, useRef } from "react";
import Spinner from "./Spinner";

const muxPlayerSrc = "https://cdn.jsdelivr.net/npm/@mux/mux-player";

export default function VideoModal({ open, onClose, playbackId, title, onWatched }) {
  const playerRef = useRef();

  useEffect(() => {
    if (!open) return;
    if (playbackId && !window.muxPlayerLoaded) {
      const script = document.createElement("script");
      script.src = muxPlayerSrc;
      script.async = true;
      script.onload = () => { window.muxPlayerLoaded = true; };
      document.body.appendChild(script);
    }
  }, [open, playbackId]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = e => { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !playbackId) return;
    // Listen for video end to trigger 'watched'
    const handler = (e) => {
      if (e.type === "ended" && onWatched) onWatched();
    };
    const root = playerRef.current;
    if (root && root.firstChild && root.firstChild.tagName === "MUX-PLAYER") {
      root.firstChild.addEventListener("ended", handler);
      return () => root.firstChild.removeEventListener("ended", handler);
    }
  }, [open, playbackId, onWatched]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <div className="modal-body" ref={playerRef}>
          {playbackId && !playbackId.startsWith('YOUR_') ? (
            <mux-player
              playback-id={playbackId}
              metadata-video-title={title}
              stream-type="on-demand"
              style={{width:"100%", height:"320px", borderRadius:"8px"}}
              accent-color="#3b82f6"
              autoPlay
            ></mux-player>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
}