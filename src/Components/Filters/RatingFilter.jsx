import React from "react";
import StarRating from "../StarRating.jsx";

const RatingFilter = ({ ratingQuery, setRatingQuery }) => {
  return (
    <div className="form-group">
      <label htmlFor="Rating">Customer Reviews</label>
      <StarRating
        value={Number(ratingQuery) || 0}
        onChange={(v) => setRatingQuery(v.toString())}
        size={28}
      />
    </div>
  );
};

export default RatingFilter;
