<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from "react";
import "./Search.css";
import StarRating from "./StarRating.jsx";
import data from "../Data/data.jsx";
import Options from "./Options.jsx";

const SearchForm = () => {
  const [colorQuery, setColorQuery] = useState("");
  const [materialQuery, setMaterialQuery] = useState("");
>>>>>>> 16cf4581febc86d763238e00c7d0735c93789ba2
  const [minPriceQuery, setMinPriceQuery] = useState(20);
  const [maxPriceQuery, setMaxPriceQuery] = useState(600);
  const [sizeQuery, setSizeQuery] = useState("");
  const [ratingQuery, setRatingQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [results, setResults] = useState([]);

<<<<<<< HEAD
  // Filter Logic
=======
  // 🔍 Filter logic
>>>>>>> 16cf4581febc86d763238e00c7d0735c93789ba2
  const handleSearch = () => {
    const filtered = data.filter((item) => {
      const matchesColor =
        !colorQuery ||
        item.color.some((c) => c.toLowerCase() === colorQuery.toLowerCase());
      const matchesMaterial =
<<<<<<< HEAD
        materialQuery.length === 0 ||
        materialQuery.includes(item.material.toLowerCase());
      const matchesPrice =
        (!minPriceQuery || item.price >= minPriceQuery) &&
        (!maxPriceQuery || item.price <= maxPriceQuery);
      const matchesSize = !sizeQuery || item.size.includes(sizeQuery);
      const matchesRating =
        !ratingQuery || item.rating >= parseFloat(ratingQuery);
=======
        !materialQuery ||
        item.material.toLowerCase() === materialQuery.toLowerCase();
      const matchesPrice =
        (!minPriceQuery || item.price >= Number.parseFloat(minPriceQuery)) &&
        (!maxPriceQuery || item.price <= Number.parseFloat(maxPriceQuery));
      const matchesSize = !sizeQuery || item.size.includes(sizeQuery);
      const matchesRating = !ratingQuery || item.rating >= parseFloat(ratingQuery);
>>>>>>> 16cf4581febc86d763238e00c7d0735c93789ba2
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
<<<<<<< HEAD
    setResults(filtered);
  };

=======

    setResults(filtered);
  };

  // Auto search when filters change
>>>>>>> 16cf4581febc86d763238e00c7d0735c93789ba2
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

<<<<<<< HEAD
  // Load options
=======
  // --- Options setup ---
>>>>>>> 16cf4581febc86d763238e00c7d0735c93789ba2
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
<<<<<<< HEAD
    setSizes(sizeOrder.filter((size) => sizeList.includes(size)));
=======
    const sortedSizes = sizeOrder.filter((size) => sizeList.includes(size));
    setSizes(sortedSizes);
>>>>>>> 16cf4581febc86d763238e00c7d0735c93789ba2
  }, []);

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
<<<<<<< HEAD
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

=======
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
>>>>>>> 16cf4581febc86d763238e00c7d0735c93789ba2
      <div className="results">
        {results.length > 0 ? (
          <ul className="results-grid">
            {results.map((item) => (
<<<<<<< HEAD
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
=======
              <li key={item.id}>
                <strong>{item.id}</strong> — {item.title} (
                Color: {item.color.join(", ")},
                Material: {item.material},
                Price: ₹{item.price}, 
                Size: {item.size.join(", ")},
                Rating:{" "}{item.rating}, 
                Category: {item.category})
>>>>>>> 16cf4581febc86d763238e00c7d0735c93789ba2
              </li>
            ))}
          </ul>
        ) : (
          (colorQuery ||
<<<<<<< HEAD
            materialQuery.length > 0 ||
            sizeQuery ||
            ratingQuery ||
            categoryQuery) && <p className="no-results">No items found matching your search</p>
=======
            materialQuery ||
            sizeQuery ||
            ratingQuery ||
            categoryQuery) && <p>No items found matching your search</p>
>>>>>>> 16cf4581febc86d763238e00c7d0735c93789ba2
        )}
      </div>
    </div>
  );
};

export default SearchForm;
<<<<<<< HEAD
// ...existing code...
=======
>>>>>>> 16cf4581febc86d763238e00c7d0735c93789ba2
