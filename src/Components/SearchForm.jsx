import React, { useState, useEffect } from "react";
import "./Search.css";
import data from "../Data/data";
// import { Options } from "../Options/Options";

const SearchForm = () => {
  // Get all prices from data
  const allPrices = data.map((item) => item.price);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  // Local states
  const [colorQuery, setColorQuery] = useState("");
  const [materialQuery, setMaterialQuery] = useState("");
  const [sizeQuery, setSizeQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [minPriceQuery, setMinPriceQuery] = useState(minPrice);
  const [maxPriceQuery, setMaxPriceQuery] = useState(maxPrice);
  const [results, setResults] = useState(data);

  // Filter function
  useEffect(() => {
    const filtered = data.filter((item) => {
      const matchColor = colorQuery ? item.color.includes(colorQuery) : true;
      const matchMaterial = materialQuery
        ? item.material === materialQuery
        : true;
      const matchSize = sizeQuery ? item.size.includes(sizeQuery) : true;
      const matchCategory = categoryQuery
        ? item.category.includes(categoryQuery)
        : true;
      const matchPrice =
        item.price >= minPriceQuery && item.price <= maxPriceQuery;

      return (
        matchColor && matchMaterial && matchSize && matchCategory && matchPrice
      );
    });
    setResults(filtered);
  }, [
    colorQuery,
    materialQuery,
    sizeQuery,
    categoryQuery,
    minPriceQuery,
    maxPriceQuery,
  ]);

  // Extract unique values
  const colors = [...new Set(data.flatMap((item) => item.color))];
  const materials = [...new Set(data.map((item) => item.material))];
  const sizes = [...new Set(data.flatMap((item) => item.size))];
  const categories = [...new Set(data.flatMap((item) => item.category))];

  return (
    <div className="search-container">
      <div className="search-form">
        {/* Category */}
        <div className="form-group">
          <label>Category:</label>
          <div className="radio-group">
            {categories.map((cat) => (
              <label key={cat}>
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={categoryQuery === cat}
                  onChange={(e) => setCategoryQuery(e.target.value)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Price Slider */}
        <div className="form-group price-slider">
          <label>Price:</label>
          <div className="price-values">
            ₹{minPriceQuery} – ₹{maxPriceQuery}+
          </div>
          <div className="slider-container">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={minPriceQuery}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val <= maxPriceQuery) setMinPriceQuery(val);
              }}
              className="slider-thumb"
            />
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={maxPriceQuery}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= minPriceQuery) setMaxPriceQuery(val);
              }}
              className="slider-thumb"
            />
          </div>
        </div>

        {/* Color */}
        <div className="form-group color-radio-group">
          <label>Color:</label>
          {colors.map((color) => (
            <div key={color}>
              <input
                type="radio"
                id={color}
                name="color"
                value={color}
                checked={colorQuery === color}
                onChange={(e) => setColorQuery(e.target.value)}
              />
              <label htmlFor={color}>
                <span
                  className="color-dot"
                  style={{ backgroundColor: color }}
                ></span>
                {color}
              </label>
            </div>
          ))}
        </div>

        {/* Material */}
        <div className="form-group">
          <label>Material:</label>
          <div className="radio-group">
            {materials.map((mat) => (
              <label key={mat}>
                <input
                  type="radio"
                  name="material"
                  value={mat}
                  checked={materialQuery === mat}
                  onChange={(e) => setMaterialQuery(e.target.value)}
                />
                {mat}
              </label>
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="form-group">
          <label>Size:</label>
          <div className="radio-group">
            {sizes.map((size) => (
              <label key={size}>
                <input
                  type="radio"
                  name="size"
                  value={size}
                  checked={sizeQuery === size}
                  onChange={(e) => setSizeQuery(e.target.value)}
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        <button
          className="btn-clear-filters"
          onClick={() => {
            setColorQuery("");
            setMaterialQuery("");
            setSizeQuery("");
            setCategoryQuery("");
            setMinPriceQuery(minPrice);
            setMaxPriceQuery(maxPrice);
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* Results */}
      <div className="results">
        <ul className="results-grid">
          {results.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <p>
                <b>Brand:</b> {item.brand}
              </p>
              <p>
                <b>Price:</b> ₹{item.price}
              </p>
              <p>
                <b>Material:</b> {item.material}
              </p>
              <p>
                <b>Color:</b> {item.color.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchForm;
