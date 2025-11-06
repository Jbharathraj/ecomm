// src/Components/SearchForm.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Styles/Search.css";
import { data } from "../Data/data.js";
import Options from "./Options.jsx";
import ColorFilter from "./Filters/ColorFilter.jsx";
import MaterialFilter from "./Filters/MaterialFilter.jsx";
import SizeFilter from "./Filters/SizeFilter.jsx";
import RatingFilter from "./Filters/RatingFilter.jsx";
import CategoryFilter from "./Filters/CategoryFilter.jsx";
import PriceFilter from "./Filters/PriceFilter.jsx";
import ResultsGrid from "./ResultsGrid/ResultsGrid.jsx";

const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [colorQuery, setColorQuery] = useState(searchParams.get("color") || "");
  const [materialQuery, setMaterialQuery] = useState(
    searchParams.get("material") ? searchParams.get("material").split(",") : []
  );
  const [sizeQuery, setSizeQuery] = useState(searchParams.get("size") || "");
  const [ratingQuery, setRatingQuery] = useState(searchParams.get("rating") || "");
  const [categoryQuery, setCategoryQuery] = useState(searchParams.get("category") || "");
  const [minPriceQuery, setMinPriceQuery] = useState(Number(searchParams.get("minPrice")) || 20);
  const [maxPriceQuery, setMaxPriceQuery] = useState(Number(searchParams.get("maxPrice")) || 600);
  const [results, setResults] = useState([]);

  const [colors, setColors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [showFilters, setShowFilters] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    setColors(Options.getColors());
    setMaterials(Options.getMaterial());
    setCategories(Options.getCategory());
    const sizeOrder = ["S", "M", "L", "XL", "XXL", "XXXL"];
    const sizeList = Options.getSize();
    const sortedSizes = sizeOrder.filter((s) => sizeList.includes(s));
    setSizes(sortedSizes);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    if (colorQuery) searchParams.set("color", colorQuery); else searchParams.delete("color");
    if (materialQuery.length) searchParams.set("material", materialQuery.join(",")); else searchParams.delete("material");
    if (sizeQuery) searchParams.set("size", sizeQuery); else searchParams.delete("size");
    if (ratingQuery) searchParams.set("rating", ratingQuery); else searchParams.delete("rating");
    if (categoryQuery) searchParams.set("category", categoryQuery); else searchParams.delete("category");
    if (minPriceQuery !== 20) searchParams.set("minPrice", minPriceQuery); else searchParams.delete("minPrice");
    if (maxPriceQuery !== 600) searchParams.set("maxPrice", maxPriceQuery); else searchParams.delete("maxPrice");
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  }, [colorQuery, materialQuery, sizeQuery, ratingQuery, categoryQuery, minPriceQuery, maxPriceQuery]);

  const handleSearch = () => {
    const filtered = data.filter((item) => {
      const matchesColor =
        !colorQuery ||
        (Array.isArray(item.color) &&
          item.color.some((c) => c.toLowerCase() === colorQuery.toLowerCase()));

      const matchesMaterial =
        materialQuery.length === 0 ||
        (item.material &&
          (Array.isArray(item.material)
            ? item.material.some((m) =>
                materialQuery.map((mat) => mat.toLowerCase()).includes(m.toString().toLowerCase())
              )
            : materialQuery.map((mat) => mat.toLowerCase()).includes(item.material.toString().toLowerCase())
          ));

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

  useEffect(() => {
    handleSearch();
  }, [colorQuery, materialQuery, minPriceQuery, maxPriceQuery, sizeQuery, ratingQuery, categoryQuery]);

  // ⚡ Construct active filters
  const activeFilters = [];

  if (colorQuery) activeFilters.push({ label: `Color: ${colorQuery}`, onRemove: () => setColorQuery("") });
  if (materialQuery.length)
    materialQuery.forEach((mat) =>
      activeFilters.push({
        label: `Material: ${mat}`,
        onRemove: () =>
          setMaterialQuery((prev) => prev.filter((m) => m !== mat)),
      })
    );
  if (sizeQuery) activeFilters.push({ label: `Size: ${sizeQuery}`, onRemove: () => setSizeQuery("") });
  if (ratingQuery) activeFilters.push({ label: `Rating: ${ratingQuery}+`, onRemove: () => setRatingQuery("") });
  if (categoryQuery) activeFilters.push({ label: `Category: ${categoryQuery}`, onRemove: () => setCategoryQuery("") });
  if (minPriceQuery !== 20 || maxPriceQuery !== 600)
    activeFilters.push({
      label: `Price: ₹${minPriceQuery}–₹${maxPriceQuery}`,
      onRemove: () => {
        setMinPriceQuery(20);
        setMaxPriceQuery(600);
      },
    });

  const clearAllFilters = () => {
    setColorQuery("");
    setMaterialQuery([]);
    setSizeQuery("");
    setRatingQuery("");
    setCategoryQuery("");
    setMinPriceQuery(20);
    setMaxPriceQuery(600);
  };

  return (
    <div className="search-container">
      <button
        className="mobile-filter-btn"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Close Filters" : "Open Filters"}
      </button>

      <form
        className={`search-form ${showFilters ? "show-filters" : ""}`}
        onSubmit={(e) => e.preventDefault()}
      >
        <ColorFilter colors={colors} colorQuery={colorQuery} setColorQuery={setColorQuery} />
        <MaterialFilter materials={materials} materialQuery={materialQuery} setMaterialQuery={setMaterialQuery} />
        <PriceFilter minPriceQuery={minPriceQuery} maxPriceQuery={maxPriceQuery} setMinPriceQuery={setMinPriceQuery} setMaxPriceQuery={setMaxPriceQuery} />
        <SizeFilter sizes={sizes} sizeQuery={sizeQuery} setSizeQuery={setSizeQuery} />
        <RatingFilter ratingQuery={ratingQuery} setRatingQuery={setRatingQuery} />
        <CategoryFilter categories={categories} categoryQuery={categoryQuery} setCategoryQuery={setCategoryQuery} />
      </form>

      {/*  Active Filters Bar */}
      {activeFilters.length > 0 && (
        <div className="active-filters-bar">
          <span className="filter-label">Filtered by:</span>
          {activeFilters.map((filter, idx) => (
            <div key={idx} className="filter-chip">
              {filter.label}
              <button className="remove-btn" onClick={filter.onRemove}>
                ✕
              </button>
            </div>
          ))}
          <button className="clear-all-btn" onClick={clearAllFilters}>
            Clear All
          </button>
        </div>
      )}

      <div className="results">
        {results.length > 0 ? (
          <ResultsGrid results={results} />
        ) : (
          (colorQuery ||
            materialQuery.length ||
            sizeQuery ||
            ratingQuery ||
            categoryQuery ||
            minPriceQuery !== 20 ||
            maxPriceQuery !== 600) && (
            <p className="no-results">No items found matching your search</p>
          )
        )}
      </div>
    </div>
  );
};

export default SearchForm;
 