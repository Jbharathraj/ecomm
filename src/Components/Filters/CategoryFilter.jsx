import React from "react";

const CategoryFilter = ({ categories, categoryQuery, setCategoryQuery }) => {
  return (
    <div className="form-group">
      <label>Category:</label>
      <div className="radio-group">
        {categories.map((category) => (
          <label key={category} style={{ marginRight: "14px" }}>
            <input
              type="radio"
              name="category"
              value={category}
              checked={categoryQuery === category}
              onClick={() =>
                setCategoryQuery((prev) =>
                  prev === category ? "" : category
                )
              }
              readOnly
            />
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
