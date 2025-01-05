import React, { useState } from "react";
import Slider from "@mui/material/Slider";

const PriceSlider = ({ minPrice, maxPrice, onPriceChange }) => {
    const [sliderValue, setSliderValue] = useState([minPrice, maxPrice]);

    // Handle value changes during slider interaction (updates UI only)
    const handleChange = (event, newValue) => {
        setSliderValue(newValue);
    };

    // Handle the final value when the interaction ends (e.g., mouse release)
    const handleChangeCommitted = (event, newValue) => {
        onPriceChange(newValue); // Call the database fetch function
    };

    return (
        <div>
            <h5>Цена: {sliderValue[0]} – {sliderValue[1]}</h5>
            <Slider
                value={sliderValue}
                min={0}
                max={200000} // Adjust based on your expected range
                onChange={handleChange} // Update UI during interaction
                onChangeCommitted={handleChangeCommitted} // Trigger database call on release
                valueLabelDisplay="auto"
            />
        </div>
    );
};

export default PriceSlider;