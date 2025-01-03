import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Phones from "../Phones/phonesList";
import Header from "../Header/header";
import Aside from "../Aside/aside";
import PhonesService from "../../repository/phones";

const App = () => {
  const [phones, setPhones] = useState([]);
  const [filters, setFilters] = useState({
    vendors: [],
    brands: [],
    minPrice: null,
    maxPrice: null,
    sortBy: "popular",
    phoneLength: 0,
  });

  useEffect(() => {
    fetchFilteredPhones();
  }, [filters]);

  const fetchFilteredPhones = () => {
    const { vendors, brands, minPrice, maxPrice, sortBy } = filters;
    PhonesService.fetchFilteredPhones(vendors, brands, minPrice, maxPrice, sortBy)
        .then((response) => {
          setPhones(response.data);
          setFilters((prevFilters) => ({
            ...prevFilters,
            phoneLength: response.data.length,
          }));
        })
        .catch((error) => console.error("Error fetching filtered phones:", error));
  };

  const handleFilterChange = (updatedFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...updatedFilters,
    }));
  };

  return (
      <Router>
        <Header onFilterChange={handleFilterChange} totalOffers={filters.phoneLength} />
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Aside onFilterChange={handleFilterChange} />
            </div>
            <div className="col-md-9">
              <Routes>
                <Route path="/" element={<Phones allPhones={phones} onFilterChange={handleFilterChange} />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
  );
};

export default App;
