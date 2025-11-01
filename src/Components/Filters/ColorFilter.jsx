import React from "react";

const ColorFilter = ({ colors, colorQuery, setColorQuery }) => {
  return (
    <div className="form-group">
      <label>Color</label>
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
              className={`color-dot ${
                color.toLowerCase() === "white" ? "white" : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            >
              {colorQuery === color && (
                <span className="inner-dot">&#10003;</span>
              )}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;
