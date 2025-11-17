import React from "react";

const MovieModal = ({ show, onClose }) => {
  if (!show) return null;
  const image = show.image?.original || show.image?.medium || null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {image && <img src={image} alt={show.name} />}
        <h2>{show.name}</h2>
        <p style={{ color: "var(--muted)", marginTop: 8 }} dangerouslySetInnerHTML={{ __html: show.summary || "<i>No summary available.</i>" }} />
        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap", color: "var(--muted)" }}>
          <div><strong>Type:</strong> {show.type || "—"}</div>
          <div><strong>Network:</strong> {show.network?.name || show.webChannel?.name || "—"}</div>
          <div><strong>Status:</strong> {show.status || "—"}</div>
        </div>

        <div style={{ marginTop: 16, textAlign: "right" }}>
          <button className="page-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
