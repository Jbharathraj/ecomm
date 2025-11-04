// src/Components/ResultsList.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "../StarRating.jsx";
import "./ResultsList.css";

const ResultsList = ({ items }) => {
  const navigate = useNavigate();

  const handleViewDetails = (item) => {
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

  return (
    <div className="results-list">
      {items.map((item) => (
        <div key={item.id} className="list-card" role="article">
          <div className="list-content">
            <h3 className="product-name">{item.title}</h3>
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

            <div className="product-sub">
              <div>Colors: {Array.isArray(item.color) ? item.color.join(", ") : item.color}</div>
              <div>Materials: {Array.isArray(item.material) ? item.material.join(", ") : item.material}</div>
              <div>Sizes: {Array.isArray(item.size) ? item.size.join(", ") : item.size}</div>
              <div>Category: {Array.isArray(item.category) ? item.category.join(", ") : item.category}</div>
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
  );
};

export default ResultsList;
