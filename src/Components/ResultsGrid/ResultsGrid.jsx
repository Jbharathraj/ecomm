// src/Components/ResultsGrid/ResultsGrid.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import "../Styles/ResultsGrid.css";
import StarRating from "../StarRating.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import productImages from "../ProductImage/ProductImage"; 
import { FaList, FaThLarge } from "react-icons/fa";
import ResultsList from "../ResultsList/ResultsList.jsx";

const ResultsGrid = ({ results }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(location.search);

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1")
  );
  const [viewMode, setViewMode] = useState(
    localStorage.getItem("viewMode") || "grid"
  );

  const itemsPerPage = 12;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    searchParams.set("page", page);
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => setCurrentPage(1), [results]);
  useEffect(() => localStorage.setItem("viewMode", viewMode), [viewMode]);
  useEffect(() => window.scrollTo({ top: 0, behavior: "auto" }), [currentPage]);

  const filterColor = searchParams.get("color")?.toLowerCase();

  // 1️⃣ Filter products based on selected color if filter is applied
  const filteredResults = React.useMemo(() => {
    if (!filterColor) return results; // no filter, return all products

    return results.filter((item) =>
      Array.isArray(item.color)
        ? item.color.some((c) => c.toLowerCase() === filterColor)
        : item.color?.toLowerCase() === filterColor
    );
  }, [results, filterColor]);

  // 2️⃣ Memoize images per product
  const memoizedImages = React.useMemo(() => {
    const map = {};
    if (!filteredResults) return map;

    filteredResults.forEach((item) => {
      const colors = Array.isArray(item.color) ? item.color : [item.color];

      let availableImages = [];

      if (filterColor) {
        // If filter is applied, select images matching the filter color
        availableImages = Object.keys(productImages)
          .filter((imgKey) => imgKey.toLowerCase().includes(filterColor))
          .map((imgKey) => productImages[imgKey]);
      }

      // If no filter or no images for filter color, pick images from product colors
      if (availableImages.length === 0) {
        availableImages = Object.keys(productImages)
          .filter((imgKey) =>
            colors.some((c) => imgKey.toLowerCase().includes(c.toLowerCase()))
          )
          .map((imgKey) => productImages[imgKey]);
      }

const key = filterColor ? `${item.id}-${filterColor}` : `${item.id}`;

     const colorImage = availableImages.find(img =>
  img.includes(key)
);

// If found, use it; otherwise pick a random one; fallback if none
map[item.id] = colorImage
  ? colorImage
  : availableImages.length > 0
    ? availableImages[Math.floor(Math.random() * availableImages.length)]
    : "/fallback.png";
      
    });

    return map;
  }, [filteredResults, filterColor]);

  if (!filteredResults || filteredResults.length === 0) {
    return <p className="no-results">No items found matching your search.</p>;
  }

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredResults.slice(startIndex, startIndex + itemsPerPage);

  const handleViewDetails = (item) => {
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

  return (
    <div className="results-wrapper">
      {/* --- View Mode Toggle Buttons --- */}
      <div className="view-toggle-buttons">
        <button
          className={`toggle-btn ${viewMode === "list" ? "active" : ""}`}
          onClick={() => setViewMode("list")}
        >
          <FaList className="icon" /> List
        </button>
        <button
          className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
          onClick={() => setViewMode("grid")}
        >
          <FaThLarge className="icon" /> Grid
        </button>
      </div>

      {/* --- Conditionally Render Grid or List --- */}
      {viewMode === "grid" ? (
        <>
          <div className="results-grid">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="result-card"
                role="article"
                onClick={() => handleViewDetails(item)}
                style={{ cursor: "pointer" }}
              >
                <div className="product-image-container">
                  <img
                    src={memoizedImages[item.id]}
                    alt={item.title}
                    className="product-image"
                  />
                </div>
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
                      />
                      <span className="rating-value">({item.rating})</span>
                    </div>
                  </div>
                  <div className="product-sub">
                    <div>
                      Colors: {Array.isArray(item.color) ? item.color.join(", ") : item.color}
                    </div>
                    <div>
                      Materials: {Array.isArray(item.material) ? item.material.join(", ") : item.material}
                    </div>
                    <div>
                      Sizes: {Array.isArray(item.size) ? item.size.join(", ") : item.size}
                    </div>
                    <div>
                      Category: {Array.isArray(item.category) ? item.category.join(", ") : item.category}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <>
          <ResultsList items={currentItems} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default ResultsGrid;
