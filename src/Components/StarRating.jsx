import React, { useState, useEffect } from "react";

const StarRating = ({ value = 0, onChange = () => {}, size = 26 }) => {
  const [selectedValue, setSelectedValue] = useState(value);

  // Keep internal state synced with prop
  useEffect(() => {
    console.log("StarRating value:", value); // Debugging
    setSelectedValue(value);
  }, [value]);

  const handleClick = (val) => {
    if (selectedValue === val) {
      setSelectedValue(0);
      onChange(0);
    } else {
      setSelectedValue(val);
      onChange(val);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFull = selectedValue >= i;
      const isHalf = !isFull && selectedValue >= i - 0.5;

      stars.push(
        <span
          key={i}
          onClick={() => handleClick(i)}
          style={{
            color: isFull ? "#f6a700" : isHalf ? "#f6a700" : "#aba9a9ff",
            cursor: "pointer",
            fontSize: size,
            position: "relative",
            lineHeight: 1,
          }}
        >
          {isHalf ? (
            <>
              <span
                style={{
                  position: "absolute",
                  color: "#f6a700",
                  width: "50%",
                  overflow: "hidden",
                  display: "inline-block",
                  top: 0,
                  left: 0,
                }}
              >
                ★
              </span>
              <span style={{ color: "#f7f5f5ff" }}>★</span>
            </>
          ) : (
            "★"
          )}
        </span>
      );
    }
    return stars;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        marginTop: "4px",
      }}
    >
      <div style={{ display: "flex", gap: "2px" }}>{renderStars()}</div>
      <span style={{ fontSize: "14px", color: "#444", fontWeight: "500" }}>
        up to
      </span>
    </div>
  );
};

export default StarRating;