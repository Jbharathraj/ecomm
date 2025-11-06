// src/Components/ResultsList.jsx
import React, { useMemo } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import StarRating from "../StarRating.jsx";
import productImages from "../ProductImage/ProductImage";
import "./ResultsList.css";

const ResultsList = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams(location.search);

  const filterColor = searchParams.get("color")?.toLowerCase();

  // Memoize image selection per product
  const memoizedImages = useMemo(() => {
    const map = {};
    if (!items) return map;

    items.forEach((item) => {
      const colors = Array.isArray(item.color) ? item.color : [item.color];

      let availableImages = [];

      if (filterColor) {
        //  If a color filter is applied, select images matching filter
        availableImages = Object.keys(productImages)
          .filter((imgKey) => imgKey.toLowerCase().includes(filterColor))
          .map((imgKey) => productImages[imgKey]);
      }

      //  If no filter or no image for filter color, pick images from product colors
      if (availableImages.length === 0) {
        availableImages = Object.keys(productImages)
          .filter((imgKey) =>
            colors.some((c) => imgKey.toLowerCase().includes(c.toLowerCase()))
          )
          .map((imgKey) => productImages[imgKey]);
      }

      const key = filterColor ? `${item.id}-${filterColor}` : `${item.id}`;

      const colorImage = availableImages.find((img) => img.includes(key));

      // If found, use it; otherwise pick a random one; fallback if none
      map[item.id] = colorImage
        ? colorImage
        : availableImages.length > 0
        ? availableImages[
            Math.floor(Math.random() * availableImages.length)
          ]
        : "/fallback.png";
    });

    return map;
  }, [items, filterColor]);

  const handleViewDetails = (item) => {
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

  return (
    <div className="results-list">
      {items.map((item) => (
        <div
          key={item.id}
          className="list-card"
          role="article"
          onClick={() => handleViewDetails(item)}
          style={{ cursor: "pointer" }}
        >
          <div className="list-card-image">
            <img src={memoizedImages[item.id]} alt={item.title} />
          </div>

          <div className="list-content">
            <h3 className="product-name">{item.title}</h3>
            <div className="product-price">₹{item.price}</div>

            <div className="product-rating">
              <StarRating
                value={Number(item.rating) || 0}
                size={16}
                showLabel={false}
                showText={false}
                onChange={() => {}}
              />
              <span className="rating-value">({item.rating})</span>
            </div>

            <div className="product-sub">
              <div>
                Colors:{" "}
                {Array.isArray(item.color) ? item.color.join(", ") : item.color}
              </div>
              <div>
                Materials:{" "}
                {Array.isArray(item.material)
                  ? item.material.join(", ")
                  : item.material}
              </div>
              <div>
                Sizes:{" "}
                {Array.isArray(item.size) ? item.size.join(", ") : item.size}
              </div>
              <div>
                Category:{" "}
                {Array.isArray(item.category)
                  ? item.category.join(", ")
                  : item.category}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsList;