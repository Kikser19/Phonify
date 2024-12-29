import React, { useState } from "react";
import PhoneTerm from "../Phones/phoneTerm";
import ReactPaginate from "react-paginate";

const Phones = (props) => {
  const [page, setPage] = useState(0);  // Current page number
  const [size] = useState(5);  // Items per page (static value)

  // Function to get the phones for the current page
  const getPhonesPage = (offset, nextPageOffset) => {
    return props.phones
      .map((term, index) => <PhoneTerm key={index} term={term} />)
      .filter((product, index) => index >= offset && index < nextPageOffset);
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
    console.log(selected);
    setPage(selected);  // Update the page state
  };

  return (
    <div className={"container mm-4 mt-5"}>
      <div className={"row"}>
        <div className={"table-responsive"}>
          {phones}
        </div>
      </div>
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
