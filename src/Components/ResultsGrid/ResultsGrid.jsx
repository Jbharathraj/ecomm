import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/ResultsGrid.css";
import StarRating from "../StarRating.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import ResultsList from "../ResultsList/ResultsList.jsx";

const ResultsGrid = ({ results }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState(
    localStorage.getItem("viewMode") || "grid"
  );
  const itemsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(1);
  }, [results]);

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  if (!results || results.length === 0) {
    return <p className="no-results">No items found matching your search.</p>;
  }

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = results.slice(startIndex, startIndex + itemsPerPage);

  const handleViewDetails = (item) => {
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

  return (
    <div className="results-wrapper">
      <div className="view-toggle-container">
        <label htmlFor="viewSelect">View:</label>
        <select
          id="viewSelect"
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          className="view-select"
        >
          <option value="grid">Grid View</option>
          <option value="list">List View</option>
        </select>
      </div>

      {viewMode === "grid" ? (
        <>
          <div className="results-grid">
            {currentItems.map((item) => (
              <div key={item.id} className="result-card" role="article">
                <div className="product-details">
                  <h3 className="product-name">{item.title}</h3>

                  <div className="product-meta">
                    <div className="product-price">₹{item.price}</div>
                    <div className="product-rating">
                      <StarRating
                        value={Number(item.rating) || 0}
                        size={16}
                        showLabel={false}
                        showText={false}
                        onChange={() => {}}
                      />
                      <span className="rating-value">({item.rating})</span>
                    </div>
                  </div>

                  <div className="product-sub">
                    <div>
                      Colors:{" "}
                      {Array.isArray(item.color)
                        ? item.color.join(", ")
                        : item.color}
                    </div>
                    <div>
                      Materials:{" "}
                      {Array.isArray(item.material)
                        ? item.material.join(", ")
                        : item.material}
                    </div>
                    <div>
                      Sizes:{" "}
                      {Array.isArray(item.size)
                        ? item.size.join(", ")
                        : item.size}
                    </div>
                    <div>
                      Category:{" "}
                      {Array.isArray(item.category)
                        ? item.category.join(", ")
                        : item.category}
                    </div>
                  </div>

                  <div className="card-actions">
                    <button
                      className="btn btn-ghost"
                      onClick={() => handleViewDetails(item)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <>
          <ResultsList items={currentItems} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default ResultsGrid;
