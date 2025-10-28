import React, { useState, useEffect } from "react";
import "./Search.css";
import StarRating from "./StarRating.jsx";
import data from "../Data/data.jsx";
import Options from "./Options.jsx";

const SearchForm = () => {
  const [colorQuery, setColorQuery] = useState("");
  const [materialQuery, setMaterialQuery] = useState("");
  const [minPriceQuery, setMinPriceQuery] = useState(100);
  const [maxPriceQuery, setMaxPriceQuery] = useState(500);
  const [sizeQuery, setSizeQuery] = useState("");
  const [starQuery, setStarQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [results, setResults] = useState([]);

  // 🔍 Filter logic
  const handleSearch = () => {
    const filtered = data.filter((item) => {
      const matchesColor =
        !colorQuery ||
        item.color.some((c) => c.toLowerCase() === colorQuery.toLowerCase());
      const matchesMaterial =
        !materialQuery ||
        item.material.toLowerCase() === materialQuery.toLowerCase();
      const matchesPrice =
        (!minPriceQuery || item.price >= Number.parseFloat(minPriceQuery)) &&
        (!maxPriceQuery || item.price <= Number.parseFloat(maxPriceQuery));
      const matchesSize = !sizeQuery || item.size.includes(sizeQuery);
      const matchesStar = !starQuery || item.star >= parseFloat(starQuery);
      const matchesCategory =
        !categoryQuery || item.category.includes(categoryQuery);

      return (
        matchesColor &&
        matchesMaterial &&
        matchesPrice &&
        matchesSize &&
        matchesStar &&
        matchesCategory
      );
    });

    setResults(filtered);
  };

  // Auto search when filters change
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    colorQuery,
    materialQuery,
    minPriceQuery,
    maxPriceQuery,
    sizeQuery,
    starQuery,
    categoryQuery,
  ]);

  // --- Options setup ---
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
    const sortedSizes = sizeOrder.filter((size) => sizeList.includes(size));
    setSizes(sortedSizes);
  }, []);

  // Helper for range fill
  const min = 20;
  const max = 600;
  const getPercent = (value) => ((value - min) / (max - min)) * 100;

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        {/* Color */}
        <div className="form-group">
          <label>Color:</label>
          <div className="radio-group color-radio-group">
            {colors.map((color) => (
              <label key={color}>
                <input
                  type="radio"
                  name="color"
                  value={color}
                  checked={colorQuery === color}
                  onClick={() =>
                    setColorQuery((prev) => (prev === color ? "" : color))
                  }
                  readOnly
                />
                <span
                  className="color-dot"
                  style={{
                    backgroundColor: color.toLowerCase(),
                    border:
                      color.toLowerCase() === "white"
                        ? "1px solid #ccc"
                        : "none",
                  }}
                >
                  {colorQuery === color && <span className="inner-dot"></span>}
                </span>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Material */}
        <div className="form-group">
          <label>Material:</label>
          <div className="radio-group">
            {materials.map((material) => (
              <label key={material} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name="material"
                  value={material}
                  checked={materialQuery === material}
                  onClick={() =>
                    setMaterialQuery((prev) =>
                      prev === material ? "" : material
                    )
                  }
                  readOnly
                />
                {material.charAt(0).toUpperCase() + material.slice(1)}
              </label>
            ))}
          </div>
        </div>


        {/* ✅ Amazon-style Dual Slider */}
<div className="form-group price-slider">
  <label>Price:</label>
  <div className="price-values">
    ₹{minPriceQuery} – ₹{maxPriceQuery}+
  </div>

  <div className="slider-container">
    <div className="slider-track"></div>
    <input
      type="range"
      min="20"
      max="600"
      value={minPriceQuery}
      onChange={(e) => {
        const val = Number(e.target.value);
        if (val <= maxPriceQuery - 10) setMinPriceQuery(val);
      }}
      className="range-min"
    />
    <input
      type="range"
      min="20"
      max="600"
      value={maxPriceQuery}
      onChange={(e) => {
        const val = Number(e.target.value);
        if (val >= minPriceQuery) setMaxPriceQuery(val);``
      }}
      className="range-max"
    />
  </div>
</div>


        {/* Size */}
        <div className="form-group">
          <label>Size:</label>
          <div className="radio-group">
            {sizes.map((size) => (
              <label key={size} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name="size"
                  value={size}
                  checked={sizeQuery === size}
                  onClick={() =>
                    setSizeQuery((prev) => (prev === size ? "" : size))
                  }
                  readOnly
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="form-group">
          <label htmlFor="star">Customer Reviews</label>
          <StarRating
            value={Number(starQuery) || 0}
            onChange={(v) => setStarQuery(v)}
            size={28}
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category:</label>
          <div className="radio-group">
            {categories.map((category) => (
              <label key={category} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={categoryQuery === category}
                  onClick={() =>
                    setCategoryQuery((prev) =>
                      prev === category ? "" : category
                    )
                  }
                  readOnly
                />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
            ))}
          </div>
        </div>
      </form>

      {/* Results */}
      <div className="results">
        {results.length > 0 ? (
          <ul className="results-grid">
            {results.map((item) => (
              <li key={item.id}>
                <strong>{item.id}</strong> — {item.title} (
                Color: {item.color.join(", ")}, Material: {item.material},
                Price: ₹{item.price}, Size: {item.size.join(", ")}, Star:{" "}
                {item.star}, Category: {item.category})
              </li>
            ))}
          </ul>
        ) : (
          (colorQuery ||
            materialQuery ||
            sizeQuery ||
            starQuery ||
            categoryQuery) && <p>No items found matching your search</p>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
