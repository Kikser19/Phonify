import React, { useState } from "react";
import PhoneTerm from "../Phones/phoneTerm";
import ReactPaginate from "react-paginate";

const Phones = (props) => {
  const [page, setPage] = useState(0); // Current page number
  const [size, setSize] = useState(5); // Items per page, user-configurable

  // Function to get the phones for the current page
  const getPhonesPage = (offset, nextPageOffset) => {
    return props.phones
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
