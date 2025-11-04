import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ResultsGrid from "../ResultsGrid/ResultsGrid.jsx";
import ResultsList from "../ResultsList/ResultsList.jsx";

const ResultsPage = () => {
  const location = useLocation();
  const { items = [] } = location.state || {};

  // Load persisted view mode from localStorage immediately
  const [viewMode, setViewMode] = useState(
    () => localStorage.getItem("viewMode") || "grid"
  );

  // Keep localStorage updated when view changes
  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  // 🧠 Ensure it stays consistent after browser back navigation
  useEffect(() => {
    const savedMode = localStorage.getItem("viewMode");
    if (savedMode && savedMode !== viewMode) {
      setViewMode(savedMode);
    }

    // Listen to browser navigation (Back/Forward)
    const handlePopState = () => {
      const persistedMode = localStorage.getItem("viewMode");
      if (persistedMode) setViewMode(persistedMode);
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [viewMode]);

  return (
    <div className="results-page-container">
      <div className="view-toggle-container" style={{ justifyContent: "flex-end" }}>
        <label htmlFor="view-select">View:</label>
        <select
          id="view-select"
          className="view-select"
          value={viewMode}
          onChange={(e) => {
            const selected = e.target.value;
            setViewMode(selected);
            localStorage.setItem("viewMode", selected);
          }}
        >
          <option value="grid">Grid View</option>
          <option value="list">List View</option>
        </select>
      </div>

      {viewMode === "grid" ? (
        <ResultsGrid results={items} />
      ) : (
        <ResultsList items={items} />
      )}
    </div>
  );
};

export default ResultsPage;
