import React, { useState } from "react";
import PhoneTerm from "../Phones/phoneTerm";
import ReactPaginate from "react-paginate";
import SearchBar from "../Aside/searchBar";

const Phones = (props) => {
  const [page, setPage] = useState(0); // Current page number
  const [size, setSize] = useState(5); // Items per page, user-configurable
  const [searchTerm, setSearchTerm] = useState("");
  const onSearcBarChange = (text) =>{
    setSearchTerm(text);
  }
  const searchBarFilter = (phone, searchtext) => {
    // Ensure both the phone's full name and the search term are trimmed and in lower case
    const fullName = `${phone.brand} ${phone.model}`.toLowerCase().trim();
    const searchTextTrimmed = searchtext.toLowerCase().trim();

    // Log to verify the full name and search term
    console.log(`Full Name: ${fullName}, Search Term: ${searchTextTrimmed}`);

    // Return whether the fullName contains the search text
    return fullName.includes(searchTextTrimmed);
  };
  // Function to get the phones for the current page
  const getPhonesPage = (offset, nextPageOffset) => {
    const filteredPhones = props.phones.filter((phone) =>
        searchBarFilter(phone, searchTerm)
    );
    return filteredPhones
      .slice(offset, nextPageOffset)
      .map((term, index) => <PhoneTerm key={index} term={term} />);
  };

  // Calculate the offset and the next page offset
  const offset = size * page;
  const nextPageOffset = offset + size;
  const pageCount = Math.ceil(props.phones.length / size);

  // Get the phones for the current page
  const phones = getPhonesPage(offset, nextPageOffset);

  // Handle page change for pagination
  const handlePageClick = (data) => {
    let selected = data.selected;
    setPage(selected); // Update the page state
  };

  // Handle change in page size
  const handleSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setSize(newSize); // Update the size state
    setPage(0); // Reset to the first page
  };

  return (
    <div className={"container mm-4 mt-5"}>
      <SearchBar onSearcBarChange = {onSearcBarChange} />
      {/* Dropdown to select page size */}
      <div className="mb-3">
        <label htmlFor="pageSizeSelect" className="form-label">
          Items per page:
        </label>
        <select
          id="pageSizeSelect"
          className="form-select w-auto d-inline-block ms-2"
          value={size}
          onChange={handleSizeChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* Phones list */}
      <div className={"row"}>
        <div className={"table-responsive"}>{phones}</div>
      </div>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"back"}
        nextLabel={"next"}
        breakLabel={<a href="/#">...</a>}
        breakClassName={"break-me"}
        pageClassName={"ml-1"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination m-4 justify-content-center"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Phones;
