import { useEffect, useState } from "react";
export default function ToastContainer({ toasts, removeToast }) {
  useEffect(() => {
    if (!toasts.length) return;
    const timeout = setTimeout(() => removeToast(toasts[0].id), 2200);
    return () => clearTimeout(timeout);
  }, [toasts, removeToast]);
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div className="toast" key={t.id}>{t.message}</div>
      ))}
    </div>
  );
}