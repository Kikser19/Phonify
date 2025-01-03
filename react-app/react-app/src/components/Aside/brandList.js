import React from "react";

const BrandList = ({ brands, selectedBrands, onBrandChange }) => {
  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      onBrandChange(selectedBrands.filter((b) => b !== brand));
    } else {
      onBrandChange([...selectedBrands, brand]);
    }
  };

  return (
    <div>
      <h4>Brands</h4>
      {brands.map((brand) => (
        <div key={brand}>
          <input
            type="checkbox"
            checked={selectedBrands.includes(brand)}
            onChange={() => toggleBrand(brand)}
          />
          <label>{brand}</label>
        </div>
      ))}
    </div>
  );
};

export default BrandList;
