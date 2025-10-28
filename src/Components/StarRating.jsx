import React from "react";

const StarRating = ({ value, onChange, size = 26 }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    // Full
    if (value >= i) {
      stars.push(
        <span
          key={i}
          onClick={() => onChange(i)}
          style={{ color: "#f6a700", cursor: "pointer", fontSize: size }}
        >
          ★
        </span>
      );
    }
    // Half
    else if (value >= i - 0.5) {
      stars.push(
        <span
          key={i}
          onClick={() => onChange(i - 0.5)}
          style={{ cursor: "pointer", fontSize: size, position: "relative" }}
        >
          <span style={{
            position: "absolute",
            color: "#f6a700",
            width: "50%",
            overflow: "hidden",
            display: "inline-block",
            top: 0,
            left: 0
          }}>
            ★
          </span>
          <span style={{ color: "#ccc" }}>★</span>
        </span>
      );
    }
    // Empty
    else {
      stars.push(
        <span
          key={i}
          onClick={() => onChange(i)}
          style={{ color: "#ccc", cursor: "pointer", fontSize: size }}
        >
          ★
        </span>
      );
    }
  }
  return <div style={{ display: "flex", gap: "2px" }}>{stars}</div>;
};

export default StarRating;
