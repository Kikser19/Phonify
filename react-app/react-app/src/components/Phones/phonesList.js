import React, { useState } from "react";
import PhoneTerm from "../Phones/phoneTerm";
import ReactPaginate from "react-paginate";
import SearchBar from "../Aside/searchBar";

const Phones = ({ allPhones, onFilterChange }) => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");

  const onSearchBarChange = (text) => {
    setSearchTerm(text);
    onFilterChange((prevFilters) => ({
      ...prevFilters,
      phoneLength: filteredPhones.length,
    }));
  };

  const filteredPhones = allPhones
    .filter((phone) => {
      const fullName = `${phone.brand} ${phone.model}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    })
    .reduce((uniquePhones, phone) => {
      if (!uniquePhones.some((p) => p.brand === phone.brand && p.model === phone.model)) {
        uniquePhones.push(phone);
      }
      return uniquePhones;
    }, []);

  const offset = page * size;
  const pageCount = Math.ceil(filteredPhones.length / size);
  const currentPhones = filteredPhones.slice(offset, offset + size);

  const handlePageClick = (data) => setPage(data.selected);
  const handleSizeChange = (e) => setSize(parseInt(e.target.value, 10));

  return (
    <div
      className="container mt-5"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.50)",
        borderRadius: "1em",
        padding: "2em",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <SearchBar onSearchBarChange={onSearchBarChange} />
      <div className="mb-3">
        <label htmlFor="pageSizeSelect" className="form-label" style={{ fontSize: "16px", color: "#1A1A1D" }}>
          Items per page:
        </label>
        <select
          id="pageSizeSelect"
          className="form-select w-auto ms-2"
          value={size}
          onChange={handleSizeChange}
          style={{
            backgroundColor: "#fff",
            borderColor: "#558b71", // Pink color
            color: "#1A1A1D",
            fontSize: "16px",
            transition: "border-color 0.3s ease",
          }}
        >
          <option value={9}>9</option>
          <option value={21}>21</option>
          <option value={30}>30</option>
        </select>
      </div>
      <div
        className="row justify-content-center"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          margin: "0 auto",
        }}
      >
        {currentPhones.map((term, index) => (
          <PhoneTerm key={index} term={term} />
        ))}
      </div>
      <ReactPaginate
        previousLabel={"back"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center mt-4"}
        activeClassName={"active"}
      />
      <style>
        {`
          .pagination {
            display: flex;
            gap: 10px;
          }

          .pagination li {
            list-style: none;
          }

          .pagination .active a {
            background-color: #558b71; /* Pink color */
            color: white;
            border-radius: 4px;
            padding: 5px 10px;
            font-weight: bold;
            box-shadow: 0 4px 8px rgba(25, 64, 45, 0.4); /* Glow effect */
            transform: scale(1.1); /* Subtle scaling */
            transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          }

          .pagination a {
            text-decoration: none;
            color:rgb(64, 109, 87); /* Pink color */
            padding: 5px 10px;
            border-radius: 4px;
            transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          }

          .pagination a:hover {
            background-color:rgb(216, 239, 232);
            box-shadow: 0 4px 8px rgba(36, 59, 48, 0.4); /* Glow effect on hover */
            transform: scale(1.1); /* Subtle scaling */
          }

          .pagination .disabled a {
            color: #ccc;
            pointer-events: none;
          }

          @media (max-width: 768px) {
            .row {
              gap: 15px;
            }
          }

          @media (max-width: 480px) {
            .row {
              gap: 10px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Phones;
