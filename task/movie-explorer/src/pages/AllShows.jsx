import React, { useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import MovieCard from "../components/MovieCard";

/**
 * AllShows lists shows from TVMaze /shows endpoint.
 * We'll implement client-side pagination (6 per page).
 */
const AllShows = ({ onOpen }) => {
  const { data, loading, error } = useFetch("https://api.tvmaze.com/shows");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const total = data.length || 0;
  const maxPage = Math.max(1, Math.ceil(total / perPage));

  const pageData = useMemo(() => {
    const start = (page - 1) * perPage;
    return data.slice(start, start + perPage);
  }, [data, page]);

  if (loading) return <div className="center"><div>Loading shows...</div></div>;
  if (error) return <div className="center">Error loading shows.</div>;

  return (
    <section className="container app-wrapper">
      <div className="tabs" style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>All Shows</div>
      </div>

      <div className="grid">
        {pageData.map((show) => <MovieCard key={show.id} show={show} onClick={() => onOpen(show)} />)}
      </div>

      <div className="pagination" style={{ marginTop: 18 }}>
        <button className="page-btn" onClick={() => setPage((p) => Math.max(1, p-1))} disabled={page===1}>Prev</button>
        <div style={{ color: "var(--muted)" }}>Page {page} of {maxPage}</div>
        <button className="page-btn" onClick={() => setPage((p) => Math.min(maxPage, p+1))} disabled={page===maxPage}>Next</button>
      </div>
    </section>
  );
};

export default AllShows;
