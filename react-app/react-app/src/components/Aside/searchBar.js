import React from "react";

const SearchBar = ({ onSearchBarChange }) => {
    const handleChange = (e) => {
        onSearchBarChange(e.target.value);
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                className="form-control"
                placeholder="Search phones..."
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;
