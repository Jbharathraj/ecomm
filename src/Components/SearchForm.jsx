// ...existing code...
import React, { useState, useEffect } from "react";
import "./Styles/Search.css";
import data from "../Data/data.jsx";
import Options from "./Options.jsx";

// Import filter components
import ColorFilter from "./Filters/ColorFilter.jsx";
import MaterialFilter from "./Filters/MaterialFilter.jsx";
import SizeFilter from "./Filters/SizeFilter.jsx";
import RatingFilter from "./Filters/RatingFilter.jsx";
import CategoryFilter from "./Filters/CategoryFilter.jsx";
import PriceFilter from "./Filters/PriceFilter.jsx";

const SearchForm = () => {
  const [colorQuery, setColorQuery] = useState("");
  const [materialQuery, setMaterialQuery] = useState([]);
  const [minPriceQuery, setMinPriceQuery] = useState(20);
  const [maxPriceQuery, setMaxPriceQuery] = useState(600);
  const [sizeQuery, setSizeQuery] = useState("");
  const [ratingQuery, setRatingQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [results, setResults] = useState([]);

  // Filter Logic
  const handleSearch = () => {
    const filtered = data.filter((item) => {
      const matchesColor =
        !colorQuery ||
        item.color.some((c) => c.toLowerCase() === colorQuery.toLowerCase());
      const matchesMaterial =
        materialQuery.length === 0 ||
        materialQuery.includes(item.material.toLowerCase());
      const matchesPrice =
        (!minPriceQuery || item.price >= minPriceQuery) &&
        (!maxPriceQuery || item.price <= maxPriceQuery);
      const matchesSize = !sizeQuery || item.size.includes(sizeQuery);
      const matchesRating =
        !ratingQuery || item.rating >= parseFloat(ratingQuery);
      const matchesCategory =
        !categoryQuery || item.category.includes(categoryQuery);

      return (
        matchesColor &&
        matchesMaterial &&
        matchesPrice &&
        matchesSize &&
        matchesRating &&
        matchesCategory
      );
    });
    setResults(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [
    colorQuery,
    materialQuery,
    minPriceQuery,
    maxPriceQuery,
    sizeQuery,
    ratingQuery,
    categoryQuery,
  ]);

  // Load options
  const [colors, setColors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    setColors(Options.getColors());
    setMaterials(Options.getMaterial());
    setCategories(Options.getCategory());
    const sizeOrder = ["S", "M", "L", "XL", "XXL", "XXXL"];
    const sizeList = Options.getSize();
    setSizes(sizeOrder.filter((size) => sizeList.includes(size)));
  }, []);

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <ColorFilter
          colors={colors}
          colorQuery={colorQuery}
          setColorQuery={setColorQuery}
        />
        <MaterialFilter
          materials={materials}
          materialQuery={materialQuery}
          setMaterialQuery={setMaterialQuery}
        />
        <PriceFilter
          minPriceQuery={minPriceQuery}
          maxPriceQuery={maxPriceQuery}
          setMinPriceQuery={setMinPriceQuery}
          setMaxPriceQuery={setMaxPriceQuery}
        />
        <SizeFilter
          sizes={sizes}
          sizeQuery={sizeQuery}
          setSizeQuery={setSizeQuery}
        />
        <RatingFilter
          ratingQuery={ratingQuery}
          setRatingQuery={setRatingQuery}
        />
        <CategoryFilter
          categories={categories}
          categoryQuery={categoryQuery}
          setCategoryQuery={setCategoryQuery}
        />
      </form>

      <div className="results">
        {results.length > 0 ? (
          <ul className="results-grid">
            {results.map((item) => (
              <li key={item.id} className="result-card">
                <div className="card-header">
                  <strong className="item-title">{item.title}</strong>
                  <span className="item-price">₹{item.price}</span>
                </div>

                <div className="item-meta">
                  <span className="item-id">ID: {item.id}</span>
                  <span>• Color: {item.color.join(", ")}</span>
                </div>

                <div className="item-meta">
                  <span>Material: {item.material}</span>
                  <span>• Size: {item.size.join(", ")}</span>
                  <span>• Rating: {item.rating}</span>
                  <span>• Category: {item.category}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          (colorQuery ||
            materialQuery.length > 0 ||
            sizeQuery ||
            ratingQuery ||
            categoryQuery) && <p className="no-results">No items found matching your search</p>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
// ...existing code...