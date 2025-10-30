import React, { useState, useEffect } from "react";
import "./Search.css";
import StarRating from "./StarRating.jsx";
import data from "../Data/data.jsx";
import Options from "./Options.jsx";

const SearchForm = () => {
  const [colorQuery, setColorQuery] = useState("");
  const [materialQuery, setMaterialQuery] = useState("");
  const [minPriceQuery, setMinPriceQuery] = useState(20);
  const [maxPriceQuery, setMaxPriceQuery] = useState(600);
  const [sizeQuery, setSizeQuery] = useState("");
  const [ratingQuery, setRatingQuery] = useState("");
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
      const matchesRating = !ratingQuery || item.rating >= parseFloat(ratingQuery);
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

  // Auto search when filters change
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

{/* Price Range */}
<div className="form-group price-slider">
  <label>Price:</label>
  <div className="price-values">
    ₹{minPriceQuery} – ₹{maxPriceQuery}+
  </div>

  <div
    className="slider-container"
    style={{
      "--min": minPriceQuery,
      "--max": maxPriceQuery,
    }}
  >
    <div className="slider-track"></div>

    {/* Single slider handle (controls both directions) */}
    <input
      type="range"
      min="20"
      max="600"
      value={maxPriceQuery}
      onChange={(e) => {
        const val = Number(e.target.value);

        if (val > maxPriceQuery) {
          setMaxPriceQuery(val);
        } else if (val < minPriceQuery) {
          setMinPriceQuery(val);
        } else {
          if (val > (minPriceQuery + maxPriceQuery) / 2) {
            setMaxPriceQuery(val);
          } else {
            setMinPriceQuery(val);
          }
        }
      }}
      className="range-min"
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
          <label htmlFor="Rating">Customer Reviews</label>
          <StarRating
            value={Number(ratingQuery) || 0}
            onChange={(v) => setRatingQuery(v.toString())}
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
                Color: {item.color.join(", ")},
                Material: {item.material},
                Price: ₹{item.price}, 
                Size: {item.size.join(", ")},
                Rating:{" "}{item.rating}, 
                Category: {item.category})
              </li>
            ))}
          </ul>
        ) : (
          (colorQuery ||
            materialQuery ||
            sizeQuery ||
            ratingQuery ||
            categoryQuery) && <p>No items found matching your search</p>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
