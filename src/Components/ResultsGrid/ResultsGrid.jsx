import React from "react";
import "./ResultsGrid.css";

const ResultsGrid = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <p className="no-results">No items found matching your search.</p>
    );
  }

  return (
    <div className="results-grid">
      {results.map((item) => (
        <div key={item.id} className="result-card">
          <h4>{item.title}</h4>
          <p><strong>ID:</strong> {item.id}</p>
          <p><strong>Color:</strong> {item.color.join(", ")}</p>
          <p><strong>Material:</strong> {item.material}</p>
          <p><strong>Price:</strong> ₹{item.price}</p>
          <p><strong>Size:</strong> {item.size.join(", ")}</p>
          <p><strong>Rating:</strong> ⭐{item.rating}</p>
          <p><strong>Category:</strong> {item.category}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultsGrid;
