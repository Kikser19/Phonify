import React, { useState, useEffect } from "react";
import PhonesService from "../../repository/phones";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Phones from "../Phones/phonesList";
import Header from "../Header/header";
import Aside from "../Aside/aside";

const App = () => {
  const [phones, setPhones] = useState([]);
  const [filters, setFilters] = useState({
    vendors: [], // Selected vendors
    brands: [],  // Selected brands
    minPrice: null,
    maxPrice: null,
    sortBy: 'popular',
  });

  useEffect(() => {
    fetchFilteredPhones();
  }, [filters]);

  const fetchFilteredPhones = () => {
    const { vendors, brands, minPrice, maxPrice, sortBy } = filters;

    PhonesService.fetchFilteredPhones(vendors, brands, minPrice, maxPrice, sortBy)
      .then((response) => {
        setPhones(response.data);
      })
      .catch((error) => {
        console.error("Error fetching filtered phones:", error);
      });
  };

  const handleFilterChange = (updatedFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...updatedFilters,
    }));
  };

  return (
    <div>
      <Router>
        <Header totalOffers={phones.length} />
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Aside onFilterChange={handleFilterChange} />
            </div>
            <div className="col-md-9">
              <Routes>
                <Route path="/" element={<Phones phones={phones} />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
