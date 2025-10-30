import React from "react";

const PriceFilter = ({ minPriceQuery, maxPriceQuery, setMinPriceQuery, setMaxPriceQuery }) => {
  return (
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
          value={maxPriceQuery}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val > maxPriceQuery) setMaxPriceQuery(val);
            else if (val < minPriceQuery) setMinPriceQuery(val);
            else {
              if (val > (minPriceQuery + maxPriceQuery) / 2)
                setMaxPriceQuery(val);
              else setMinPriceQuery(val);
            }
          }}
          className="range-min"
        />
      </div>
    </div>
  );
};

export default PriceFilter;
