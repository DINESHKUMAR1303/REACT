import React, { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import AllShows from "./pages/AllShows";
import SearchResults from "./pages/SearchResults";
import MovieModal from "./components/MovieModal";
import useFetch from "./hooks/useFetch";
import usePrevious from "./hooks/usePrevious";

export default function App() {
  const [tab, setTab] = useState("all"); // 'all' or 'search'
  const [query, setQuery] = useState("");
  const prevQuery = usePrevious(query);
  const [selected, setSelected] = useState(null);

  const searchUrl = useMemo(() => {
    return query ? `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}` : null;
  }, [query]);

  const { data: searchData, loading: searchLoading, error: searchError } = useFetch(searchUrl);

  // called by Navbar (debounced inside Navbar)
  const handleSearch = (term) => {
    setQuery(term);
    if (term && term.length > 0) setTab("search");
    if (!term) setTab("all");
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} previous={prevQuery} />

      {/* tab selectors */}
      <div className="app-wrapper container">
        <div className="tabs" style={{ marginBottom: 12 }}>
          <button className={`tab-btn ${tab==="all" ? "active":""}`} onClick={() => setTab("all")}>All Shows</button>
          <button className={`tab-btn ${tab==="search" ? "active":""}`} onClick={() => setTab("search")}>Search Results</button>
        </div>
      </div>

      {/* pages */}
      {tab === "all" && <AllShows onOpen={(s) => setSelected(s)} /> }

      {tab === "search" && (
        <>
          {searchLoading && <div className="center">Searching for “{query}”...</div>}
          {searchError && <div className="center">Error while searching.</div>}
          {!searchLoading && !searchError && (
            <SearchResults results={searchData || []} onOpen={(s) => setSelected(s)} />
          )}
        </>
      )}

      <MovieModal show={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
