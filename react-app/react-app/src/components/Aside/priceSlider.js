import React from "react";
import Slider from "@mui/material/Slider";

const PriceSlider = ({ minPrice, maxPrice, onPriceChange }) => {
  const handleChange = (event, newValue) => {
    onPriceChange(newValue);
  };

  return (
    <div>
      <h5>Цена: {minPrice} – {maxPrice}</h5>
      <Slider
        value={[minPrice, maxPrice]}
        min={0}
        max={200000} // Adjust based on your expected range
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </div>
  );
};

export default PriceSlider;
