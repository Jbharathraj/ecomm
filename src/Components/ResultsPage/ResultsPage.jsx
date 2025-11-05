import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ResultsGrid from "../ResultsGrid/ResultsGrid.jsx";
import ResultsList from "../ResultsList/ResultsList.jsx";


// Import your filters
import CategoryFilter from "../Filters/CategoryFilter.jsx";
import ColorFilter from "../Filters/ColorFilter.jsx";
import MaterialFilter from "../Filters/MaterialFilter.jsx";
import PriceFilter from "../Filters/PriceFilter.jsx";
import RatingFilter from "../Filters/RatingFilter.jsx";
import SizeFilter from "../Filters/SizeFilter.jsx";

import "./ResultsPage.css"; // <-- create if not exists

const ResultsPage = () => {
  const location = useLocation();
  const { items = [] } = location.state || {};

  const [viewMode, setViewMode] = useState(
    () => localStorage.getItem("viewMode") || "grid"
  );

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  useEffect(() => {
    const savedMode = localStorage.getItem("viewMode");
    if (savedMode && savedMode !== viewMode) {
      setViewMode(savedMode);
    }

    const handlePopState = () => {
      const persistedMode = localStorage.getItem("viewMode");
      if (persistedMode) setViewMode(persistedMode);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [viewMode]);

  return (
    <div className="results-page">
      {/* 🧠 Mobile Filter Toggle Button */}
      <button
        className="filter-toggle"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {/* 🔹 Filter Section */}
      <div className={`filters-container ${showFilters ? "show" : ""}`}>
        <PriceFilter />
        <CategoryFilter />
        <ColorFilter />
        <SizeFilter />
        <MaterialFilter />
        <RatingFilter />
      </div>

      {/* 🔹 Product Results Section */}
      <div className="results-container">
        <div
          className="view-toggle-container"
          style={{ justifyContent: "flex-end" }}
        >
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
    </div>
  );
};

export default ResultsPage;
