import React, { useState } from "react";
import PhoneTerm from "../Phones/phoneTerm";
import ReactPaginate from "react-paginate";
import SearchBar from "../Aside/searchBar";

const Phones = ({ allPhones, onFilterChange }) => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
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
            // Check if this brand + model combination already exists in uniquePhones
            if (!uniquePhones.some(p => p.brand === phone.brand && p.model === phone.model)) {
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
      <div className="container mt-5">
        <SearchBar onSearchBarChange={onSearchBarChange} />
        <div className="mb-3">
          <label htmlFor="pageSizeSelect" className="form-label">
            Items per page:
          </label>
          <select
              id="pageSizeSelect"
              className="form-select w-auto ms-2"
              value={size}
              onChange={handleSizeChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="row" style={{display:"flex"}}>
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
      </div>
  );
};

export default Phones;
