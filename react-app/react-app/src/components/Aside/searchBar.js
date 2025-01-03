import React from "react";

const SearchBar = ({ onSearcBarChange }) => {
    const [searchTerm, setSearchTerm] = React.useState("");

    const handleSearchChange = (text) => {
        setSearchTerm(text);
        onSearcBarChange(text); // Pass the updated text value directly
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm} // Set the value of the input to the state
                onChange={(event) => handleSearchChange(event.target.value)}
            />
        </div>
    );
};

export default SearchBar;
