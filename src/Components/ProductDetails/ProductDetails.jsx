// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import StarRating from "../StarRating.jsx";
// import "./ProductDetails.css";

// //  Dynamic image loader function (supports PNG + JPG)
// function getProductImage(productId, productTitle, color) {
//   try {
//     const images = require.context("../Assets", false, /\.(png|jpe?g)$/);
//     const lowerColor = color?.toLowerCase() || "";

//     const pngFileById = `./${productId}-${lowerColor}.png`;
//     const jpgFileById = `./${productId}-${lowerColor}.jpg`;

//     const safeTitle = productTitle?.replace(/\s+/g, "-").toLowerCase();
//     const pngFileByTitle = `./${safeTitle}-${lowerColor}.png`;
//     const jpgFileByTitle = `./${safeTitle}-${lowerColor}.jpg`;

//     if (images.keys().includes(pngFileById)) return images(pngFileById);
//     if (images.keys().includes(jpgFileById)) return images(jpgFileById);
//     if (images.keys().includes(pngFileByTitle)) return images(pngFileByTitle);
//     if (images.keys().includes(jpgFileByTitle)) return images(jpgFileByTitle);

//     console.warn(" Image not found:", productId || productTitle, color);
//     return null;
//   } catch (error) {
//     console.warn("Error loading image:", error);
//     return null;
//   }
// }

// const ProductDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   //  Read the passed state from ResultsGrid
//   const product = location.state?.product;
//   const previousResults = location.state?.results;
//   const previousFilters = location.state?.filters;

//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);

//   useEffect(() => {
//     if (product?.color) {
//       const defaultColor = Array.isArray(product.color)
//         ? product.color[0]
//         : product.color;
//       setSelectedColor(defaultColor);
//     }
//   }, [product]);

//   if (!product) {
//     return (
//       <div className="no-product">
//         <p>Product not found.</p>
//         <button className="btn-back" onClick={() => navigate(-1)}>
//           ⬅ Back
//         </button>
//       </div>
//     );
//   }

//   const colors = Array.isArray(product.color)
//     ? product.color
//     : product.color
//     ? [product.color]
//     : [];

//   const sizes = Array.isArray(product.size)
//     ? product.size
//     : product.size
//     ? [product.size]
//     : [];

//   const imageSrc = selectedColor
//     ? getProductImage(product.id, product.title, selectedColor)
//     : null;

//   //  Enhanced back navigation (preserves filters & results)
//   const handleBack = () => {
//     if (previousResults) {
//       navigate(-1, { state: { results: previousResults, filters: previousFilters } });
//     } else {
//       navigate(-1);
//     }
//   };

//   return (
//     <div className="product-details-page">
//       {/*  Updated Back button */}
//       <button className="btn-back" onClick={handleBack}>
//         ⬅ Back
//       </button>

//       <div className="product-details-container">
//         {/* LEFT: Product Image */}
//         <div className="product-image-box">
//           {imageSrc ? (
//             <img src={imageSrc} alt={selectedColor} className="product-image" />
//           ) : (
//             <div className="no-image">Image not available</div>
//           )}
//         </div>

//         {/* RIGHT: Product Info */}
//         <div className="product-info-box">
//           <h2 className="product-title">{product.title}</h2>

//           <div className="product-meta">
//             <div className="product-price">₹{product.price}</div>

//             <div className="rating-section">
//               <StarRating value={Number(product.rating) || 0} size={18} />
//               <span className="rating-value">({product.rating})</span>
//             </div>
//           </div>

//           <div className="product-info">
//             <p>
//               <strong>Category:</strong>{" "}
//               {Array.isArray(product.category)
//                 ? product.category.join(", ")
//                 : product.category}
//             </p>
//             <p>
//               <strong>Material:</strong>{" "}
//               {Array.isArray(product.material)
//                 ? product.material.join(", ")
//                 : product.material}
//             </p>
//           </div>

//           {/* Color Options */}
//           <div className="filter-section">
//             <h4>Select Color:</h4>
//             <div className="color-options">
//               {colors.length > 0 ? (
//                 colors.map((color, idx) => (
//                   <button
//                     key={idx}
//                     className={`color-btn ${
//                       selectedColor === color ? "selected" : ""
//                     }`}
//                     style={{
//                       backgroundColor: color.toLowerCase(),
//                       border:
//                         selectedColor === color
//                           ? "3px solid #222"
//                           : "1px solid #ccc",
//                     }}
//                     onClick={() => setSelectedColor(color)}
//                   ></button>
//                 ))
//               ) : (
//                 <p>No color options available</p>
//               )}
//             </div>
//           </div>

//           {/* Size Options */}
//           <div className="filter-section">
//             <h4>Select Size:</h4>
//             <div className="size-options">
//               {sizes.length > 0 ? (
//                 sizes.map((size, idx) => (
//                   <button
//                     key={idx}
//                     className={`size-btn ${
//                       selectedSize === size ? "selected" : ""
//                     }`}
//                     onClick={() => setSelectedSize(size)}
//                   >
//                     {size}
//                   </button>
//                 ))
//               ) : (
//                 <p>No size options available</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;




// src/Components/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StarRating from "../StarRating.jsx";
import productImages from "../ProductImage/ProductImage";
import "./ProductDetails.css";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;
  const previousResults = location.state?.results;
  const previousFilters = location.state?.filters;

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (product?.color) {
      const defaultColor = Array.isArray(product.color)
        ? product.color[0]
        : product.color;
      setSelectedColor(defaultColor);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="no-product">
        <p>Product not found.</p>
        <button className="btn-back" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      </div>
    );
  }

  const colors = Array.isArray(product.color)
    ? product.color
    : product.color
    ? [product.color]
    : [];

  const sizes = Array.isArray(product.size)
    ? product.size
    : product.size
    ? [product.size]
    : [];

  // Match image by color only (random from available matches)
  const getImageSrc = (color) => {
    if (!color) return "/fallback.png";

    const availableImages = Object.keys(productImages)
      .filter((imgKey) => imgKey.toLowerCase().includes(color.toLowerCase()))
      .map((imgKey) => productImages[imgKey]);

    if (availableImages.length > 0) {
      return availableImages[Math.floor(Math.random() * availableImages.length)];
    }

    return "/fallback.png";
  };

  const imageSrc = selectedColor ? getImageSrc(selectedColor) : null;

  const handleBack = () => {
    if (previousResults) {
      navigate(-1, { state: { results: previousResults, filters: previousFilters } });
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="product-details-page">
      <button className="btn-back" onClick={handleBack}>
        ⬅ Back
      </button>

      <div className="product-details-container">
        {/* LEFT: Product Image */}
        <div className="product-image-box">
          {imageSrc ? (
            <img src={imageSrc} alt={selectedColor} className="product-image" />
          ) : (
            <div className="no-image">Image not available</div>
          )}
        </div>

        {/* RIGHT: Product Info */}
        <div className="product-info-box">
          <h2 className="product-title">{product.title}</h2>

          <div className="product-meta">
            <div className="product-price">₹{product.price}</div>

            <div className="rating-section">
              <StarRating value={Number(product.rating) || 0} size={18} />
              <span className="rating-value">({product.rating})</span>
            </div>
          </div>

          <div className="product-info">
            <p>
              <strong>Category:</strong>{" "}
              {Array.isArray(product.category)
                ? product.category.join(", ")
                : product.category}
            </p>
            <p>
              <strong>Material:</strong>{" "}
              {Array.isArray(product.material)
                ? product.material.join(", ")
                : product.material}
            </p>
          </div>

          {/* Color Options */}
          <div className="filter-section">
            <h4>Select Color:</h4>
            <div className="color-options">
              {colors.length > 0 ? (
                colors.map((color, idx) => (
                  <button
                    key={idx}
                    className={`color-btn ${selectedColor === color ? "selected" : ""}`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      border:
                        selectedColor === color ? "3px solid #222" : "1px solid #ccc",
                    }}
                    onClick={() => setSelectedColor(color)}
                  ></button>
                ))
              ) : (
                <p>No color options available</p>
              )}
            </div>
          </div>

          {/* Size Options */}
          <div className="filter-section">
            <h4>Select Size:</h4>
            <div className="size-options">
              {sizes.length > 0 ? (
                sizes.map((size, idx) => (
                  <button
                    key={idx}
                    className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <p>No size options available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
