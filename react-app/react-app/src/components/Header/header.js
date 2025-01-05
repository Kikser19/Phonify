import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ onFilterChange, totalOffers }) => {
    const navigate = useNavigate();
    const location = useLocation();  // Get the current location
    const currentDate = new Date().toLocaleDateString("mk-MK", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const handleFilterChange = (value) => {
        console.log("Brand selected:", value); // Log selected brand for debugging
        onFilterChange({ brands: [value] }); // Update filters
        navigate("/"); // Navigate to list page
    };

    // Conditionally hide the links if we're on the details page
    const isDetailsPage = location.pathname === "/phone-details";

    return (
        <div className="header">
            <div className="header-top">
                <span>Вкупно: {totalOffers} понуди</span>
                <span>Обновено: {currentDate}</span>
            </div>
            <div className="header-title">
                <h1>Phonify</h1>
            </div>
            {/* Conditionally render the links based on the current page */}
            {!isDetailsPage && (
                <div className="header-nav">
                    <ul style={{ display: "flex", justifyContent: "space-between" }}>
                        <li onClick={() => handleFilterChange("Xiaomi")}>Xiaomi</li>
                        <li onClick={() => handleFilterChange("Samsung")}>Samsung</li>
                        <li onClick={() => handleFilterChange("Apple")}>Apple</li>
                        <li onClick={() => handleFilterChange("Poco")}>Poco</li>
                        <li onClick={() => handleFilterChange("Huawei")}>Huawei</li>
                        <li onClick={() => handleFilterChange("Motorola")}>Motorola</li>
                        <li onClick={() => handleFilterChange("OnePlus")}>OnePlus</li>
                        <li onClick={() => handleFilterChange("Honor")}>Honor</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Header;
