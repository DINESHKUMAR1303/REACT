import React, { useState, useMemo } from "react";
import MovieCard from "../components/MovieCard";

/**
 * SearchResults expects results array from TVMaze search endpoint:
 * results = [{ score, show }, ...]
 * We'll map to show and paginate 6 per page.
 */
const SearchResults = ({ results = [], onOpen }) => {
  const [page, setPage] = useState(1);
  const perPage = 6;

  const shows = results.map(r => r.show ? r.show : r);
  const total = shows.length;
  const maxPage = Math.max(1, Math.ceil(total / perPage));

  const pageData = useMemo(() => {
    const start = (page - 1) * perPage;
    return shows.slice(start, start + perPage);
  }, [shows, page]);

  if (!results) return null;

  return (
    <section className="container app-wrapper">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Search Results</h2>
        <div style={{ color: "var(--muted)" }}>{total} result{total !== 1 ? "s" : ""}</div>
      </div>

      {total === 0 ? (
        <div className="center">No results found for your query.</div>
      ) : (
        <>
          <div className="grid">
            {pageData.map(show => <MovieCard key={show.id} show={show} onClick={() => onOpen(show)} />)}
          </div>

          <div className="pagination">
            <button className="page-btn" onClick={() => setPage((p) => Math.max(1,p-1))} disabled={page===1}>Prev</button>
            <div style={{ color: "var(--muted)" }}>Page {page} of {maxPage}</div>
            <button className="page-btn" onClick={() => setPage((p) => Math.min(maxPage,p+1))} disabled={page===maxPage}>Next</button>
          </div>
        </>
      )}
    </section>
  );
};

export default SearchResults;
