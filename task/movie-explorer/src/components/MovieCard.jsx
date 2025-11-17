import React from "react";

const MovieCard = ({ show, onClick }) => {
  const poster = show.image?.medium || show.image?.original || "";
  return (
    <div className="card" onClick={onClick}>
      {poster ? <img src={poster} alt={show.name} /> : <div style={{height:220,display:"flex",alignItems:"center",justifyContent:"center"}}>No Image</div>}
      <div className="card-body">
        <div className="card-title">{show.name}</div>
        <div className="card-sub">{show.language || "Unknown"} • {show.genres?.slice(0,2).join(", ") || "—"}</div>
      </div>
    </div>
  );
};

export default MovieCard;
