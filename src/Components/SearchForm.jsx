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
import ResultsGrid from "./ResultsGrid/ResultsGrid.jsx";

const SearchForm = () => {
  const [colorQuery, setColorQuery] = useState("");
  const [materialQuery, setMaterialQuery] = useState([]);
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
        materialQuery.length === 0 ||
        (item.material &&
          (
            Array.isArray(item.material)
              ? item.material.some((m) =>
                materialQuery
                  .map((mat) => mat.toLowerCase())
                  .includes(m.toString().toLowerCase())
              )
              : materialQuery
                .map((mat) => mat.toLowerCase())
                .includes(item.material.toString().toLowerCase())
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

  // auto run search when filters change
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
          <ResultsGrid results={results} />
        ) : (
          (colorQuery ||
            materialQuery ||
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