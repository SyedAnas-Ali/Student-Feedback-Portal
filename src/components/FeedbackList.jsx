import React from "react";

function Stars({ value = 0 }) {
  const v = Math.max(0, Math.min(5, Number(value) || 0));
  return (
    <span className="stars" aria-label={`${v} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < v ? "star star--filled" : "star"}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function FeedbackList({ items = [] }) {
  if (!items.length)
    return (
      <div className="placeholder">
        <p>No feedback yet. Be the first to share your thoughts!</p>
      </div>
    );

  return (
    <ul className="feedback-list">
      {items.map((fb) => (
        <li key={fb.id} className="feedback">
          <div className="feedback__header">
            <div className="feedback__title">
              <h3>{fb.fullName || "Anonymous"}</h3>
              <Stars value={fb.rating} />
            </div>
            <div className="feedback__meta">
              <span>{fb.email}</span>
              <span>Batch {fb.batch}</span>
              <span>{fb.course}</span>
              <span>Instructor: {fb.instructor}</span>
            </div>
          </div>
          <p className="feedback__text">{fb.feedback}</p>
        </li>
      ))}
    </ul>
  );
}
