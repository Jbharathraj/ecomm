// ...existing code...
import React, { useState, useEffect } from "react";
import "./Styles/Search.css";
import data from "../Data/data.jsx";
import Options from "./Options.jsx";
import ColorFilter from "./Filters/ColorFilter.jsx";
import MaterialFilter from "./Filters/MaterialFilter.jsx";
import SizeFilter from "./Filters/SizeFilter.jsx";
import RatingFilter from "./Filters/RatingFilter.jsx";
import CategoryFilter from "./Filters/CategoryFilter.jsx";
import PriceFilter from "./Filters/PriceFilter.jsx";
import StarRating from "./StarRating.jsx";

const SearchForm = () => {
  const [colorQuery, setColorQuery] = useState("");
  const [materialQuery, setMaterialQuery] = useState("");
  const [minPriceQuery, setMinPriceQuery] = useState(20);
  const [maxPriceQuery, setMaxPriceQuery] = useState(600);
  const [sizeQuery, setSizeQuery] = useState("");
  const [ratingQuery, setRatingQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [results, setResults] = useState([]);

  // Options state
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
    const sortedSizes = sizeOrder.filter((s) => sizeList.includes(s));
    setSizes(sortedSizes);
  }, []);

  const handleSearch = () => {
    const filtered = data.filter((item) => {
      const matchesColor =
        !colorQuery ||
        (Array.isArray(item.color) &&
          item.color.some((c) => c.toLowerCase() === colorQuery.toLowerCase()));

      const matchesMaterial =
        !materialQuery ||
        (item.material &&
          item.material.toLowerCase() === materialQuery.toLowerCase());

      const matchesPrice =
        (!minPriceQuery || item.price >= Number(minPriceQuery)) &&
        (!maxPriceQuery || item.price <= Number(maxPriceQuery));

      const matchesSize =
        !sizeQuery ||
        (Array.isArray(item.size) &&
          item.size.some((s) => s.toLowerCase() === sizeQuery.toLowerCase()));

      const matchesRating =
        !ratingQuery || Number(item.rating) >= Number(ratingQuery);

      const matchesCategory =
        !categoryQuery ||
        (typeof item.category === "string"
          ? item.category.toLowerCase().includes(categoryQuery.toLowerCase())
          : Array.isArray(item.category) &&
            item.category.some((c) =>
              c.toLowerCase().includes(categoryQuery.toLowerCase())
            ));

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

  // auto run search when filters change
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    colorQuery,
    materialQuery,
    minPriceQuery,
    maxPriceQuery,
    sizeQuery,
    ratingQuery,
    categoryQuery,
  ]);

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
        <RatingFilter ratingQuery={ratingQuery} setRatingQuery={setRatingQuery} />
        <CategoryFilter
          categories={categories}
          categoryQuery={categoryQuery}
          setCategoryQuery={setCategoryQuery}
        />
      </form>

      {/* Results */}
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
                  <span>• Color: {Array.isArray(item.color) ? item.color.join(", ") : item.color}</span>
                </div>

                <div className="item-meta">
                  <span>Material: {item.material}</span>
                  <span>• Size: {Array.isArray(item.size) ? item.size.join(", ") : item.size}</span>
                  <span>• Rating: {item.rating}</span>
                  <span>• Category: {Array.isArray(item.category) ? item.category.join(", ") : item.category}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          (colorQuery ||
            materialQuery ||
            sizeQuery ||
            ratingQuery ||
            categoryQuery) && <p className="no-results">No items found matching your search</p>
        )}
      </div>
    </div>
  );
};

export default SearchForm;