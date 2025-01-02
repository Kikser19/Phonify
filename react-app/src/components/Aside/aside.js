import React, { useState, useEffect } from "react";
import PriceSlider from "./priceSlider";
import BrandList from "./brandList";
import VendorList from "./vendorList";
import SortBy from "./sortBy"; // Import the SortBy component
import PhonesService from "../../repository/phones";

const Aside = ({ onFilterChange }) => {
  const [brands, setBrands] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await PhonesService.fetchBrands();
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    const fetchVendors = async () => {
      try {
        const response = await PhonesService.fetchVendors();
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchBrands();
    fetchVendors();
  }, []);

  useEffect(() => {
    onFilterChange({
      brands: selectedBrands,
      vendors: selectedVendors,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sortBy: sortBy,
    });
  }, [selectedBrands, selectedVendors, priceRange, sortBy]);

  return (
    <aside>
      <PriceSlider
        minPrice={priceRange[0]}
        maxPrice={priceRange[1]}
        onPriceChange={(newRange) => setPriceRange(newRange)}
      />
      <BrandList
        brands={brands}
        selectedBrands={selectedBrands}
        onBrandChange={setSelectedBrands}
      />
      <VendorList
        vendors={vendors}
        selectedVendors={selectedVendors}
        onVendorChange={setSelectedVendors}
      />
      <SortBy
        selectedSort={sortBy}
        onSortChange={(newSort) => setSortBy(newSort)}
      />
    </aside>
  );
};

export default Aside;
