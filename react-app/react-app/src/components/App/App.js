import React, { useState, useEffect, useRef, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Phones from "../Phones/phonesList";
import Header from "../Header/header";
import Aside from "../Aside/aside";
import PhonesService from "../../repository/phones";
import PhoneDetailsPage from "../PhoneDetailsPage/PhoneDetailsPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import headerBackground from '../../vendorImages/header-background.jpg';
import applePink from '../../vendorImages/applePink.webp'
import appleWhite from '../../vendorImages/whiteTech.jpg'
import pink from '../../vendorImages/pink.jpg'
import planina from '../../vendorImages/planina.jpg'


const App = () => {
    const navigate = useNavigate();
    const [phones, setPhones] = useState([]);
    const [phoneLength, setPhoneLength] = useState(0); // Separate state for phone length
    const [filters, setFilters] = useState({
        vendors: [],
        brands: [],
        minPrice: null,
        maxPrice: null,
        sortBy: "popular",
    });

    const debounceTimeout = useRef(null);

    // Fetch phones based on filters
    const fetchFilteredPhones = useCallback(() => {

        const { vendors, brands, minPrice, maxPrice, sortBy } = filters;

        PhonesService.fetchFilteredPhones(vendors, brands, minPrice, maxPrice, sortBy)
            .then((response) => {
                console.log("Fetched Phones:", response.data); // Debug fetched data
                setPhones(response.data);
                setPhoneLength(response.data.length); // Update phone length
            })
            .catch((error) => console.error("Error fetching filtered phones:", error));
    }, [filters]);

    // Trigger API calls when filters change (with debounce)
    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            console.log("Filters have changed:", filters); // Debug filter changes
            fetchFilteredPhones();
        }, 500); // Adjust debounce time as needed

        return () => clearTimeout(debounceTimeout.current); // Cleanup on unmount
    }, [filters, fetchFilteredPhones]);

    // Handle filter updates
    const handleFilterChange = (updatedFilters) => {
        navigate("/"); // Navigate to the list page
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...updatedFilters,
        }));
        console.log("New filters set:", updatedFilters); // Debug updated filters
    };

    return (
        <div  style={{ width: '100%', overflow: 'hidden' }}>
            <Header onFilterChange={handleFilterChange} totalOffers={phoneLength} />
            <div className="container-fluid" style={{ height: '100%' }}>
                <Routes>
                    <Route
                        path="/"
                        element={
                                <div 
                                className="row h-screen w-full bg-cover"
                                style={{ 
                                    backgroundImage: `url(${planina})`,
                                    }}
                                >
                          
                                <div
                                    className="col-md-3"
                                    style={{
                                        // backgroundImage: `url(${headerBackground})`,
                                        // backgroundSize: 'cover',
                                        // backgroundPosition: 'center',
                                        // backgroundRepeat: 'no-repeat',
                                    }}
                                >
                                    <Aside onFilterChange={handleFilterChange}/>
                                </div>
                                <div
                                    className="col-md-9"
                                    style={{
                                        // backgroundImage: `url(${applePink})`,
                                        // backgroundSize: 'cover',
                                        // backgroundPosition: 'center',
                                        // backgroundRepeat: 'repeat',

                                    }}
                                >
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
