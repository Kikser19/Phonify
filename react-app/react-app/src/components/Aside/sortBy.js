import React from "react";

const SortBy = ({ selectedSort, onSortChange }) => {
  const options = [
    { value: "popular", label: "Најпоплурано" },
    { value: "price_asc", label: "Најефтино" },
    { value: "price_desc", label: "Најскапо" },
    { value: "newest", label: "Најново" },
  ];

  return (
    <div>
      <h5>Sort By</h5>
      <select
        value={selectedSort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortBy;
