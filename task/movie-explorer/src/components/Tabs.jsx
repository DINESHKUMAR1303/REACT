const Tabs = ({ active, setActive }) => {
  return (
    <div className="tabs">
      <button
        className={active === "all" ? "active" : ""}
        onClick={() => setActive("all")}
      >
        All Shows
      </button>
      <button
        className={active === "search" ? "active" : ""}
        onClick={() => setActive("search")}
      >
        Search Results
      </button>
    </div>
  );
};

export default Tabs;
