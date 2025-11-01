import React from "react";

const MaterialFilter = ({ materials, materialQuery, setMaterialQuery }) => {
  return (
    <div className="form-group">
      <label>Material:</label>
      <div className="checkbox-group">
        {materials.map((material) => (
          <label key={material} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              name="material"
              value={material}
              checked={materialQuery.includes(material)}
              onChange={() =>
                setMaterialQuery((prev) =>
                  prev.includes(material)
                    ? prev.filter((m) => m !== material)
                    : [...prev, material]
                )
              }
            />
            {material.charAt(0).toUpperCase() + material.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
};

export default MaterialFilter;
