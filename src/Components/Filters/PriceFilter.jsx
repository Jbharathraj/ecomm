import React from "react";
import "../Styles/PriceFilter.css";

const PriceFilter = ({
  minPriceQuery,
  maxPriceQuery,
  setMinPriceQuery,
  setMaxPriceQuery,
}) => {
  const min = 20;
  const max = 600;

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value < maxPriceQuery) setMinPriceQuery(value);
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value > minPriceQuery) setMaxPriceQuery(value);
  };

  return (
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
        <div className="slider-range"></div>

        {/* Min */}
        <input
          type="range"
          min={min}
          max={max}
          value={minPriceQuery}
          onChange={handleMinChange}
          className="range-input range-min"
        />

        {/* Max */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxPriceQuery}
          onChange={handleMaxChange}
          className="range-input range-max"
        />
      </div>
    </div>
  );
};

export default PriceFilter;
