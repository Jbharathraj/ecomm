import React from "react";

const SizeFilter = ({ sizes, sizeQuery, setSizeQuery }) => {
  return (
    <div className="form-group">
      <label>Size:</label>
      <div className="radio-group">
        {sizes.map((size) => (
          <label key={size} style={{ marginRight: "18px" }}>
            <input
              type="radio"
              name="size"
              value={size}
              checked={sizeQuery === size}
              onClick={() => setSizeQuery((prev) => (prev === size ? "" : size))}
              readOnly
            />
            {size}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SizeFilter;
