import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Phones from "../Phones/phonesList";
import Header from "../Header/header";
import Aside from "../Aside/aside";
import PhonesService from "../../repository/phones";
import PhoneDetailsPage from "../PhoneDetailsPage/PhoneDetailsPage";

const App = () => {
    const navigate = useNavigate();
    const location = useLocation();
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
        console.log("Filters have changed:", filters); // Log filters for debugging
        fetchFilteredPhones();
    }, [filters]); // Trigger data fetching whenever filters change

    const fetchFilteredPhones = () => {
        const { vendors, brands, minPrice, maxPrice, sortBy } = filters;
        PhonesService.fetchFilteredPhones(vendors, brands, minPrice, maxPrice, sortBy)
            .then((response) => {
                console.log("Fetched Phones:", response.data); // Log fetched data for debugging
                setPhones(response.data);
                setFilters((prevFilters) => ({
                    ...prevFilters,
                    phoneLength: response.data.length,
                }));
            })
            .catch((error) => console.error("Error fetching filtered phones:", error));
    };

    const handleFilterChange = (updatedFilters) => {
        navigate("/");
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...updatedFilters,
        }));
        console.log("New filters set:", updatedFilters); // Log new filters to ensure they're being set correctly
         // Navigate to the list page after updating filters
    };

    return (
        <div>
            <Header onFilterChange={handleFilterChange} totalOffers={filters.phoneLength} />
            <div className="container">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="row">
                                <div className="col-md-3">
                                    <Aside onFilterChange={handleFilterChange} />
                                </div>
                                <div className="col-md-9">
                                    <Phones allPhones={phones} onFilterChange={handleFilterChange} />
                                </div>
                            </div>
                        }
                    />
                    <Route path="/phone-details" element={<PhoneDetailsPage />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
