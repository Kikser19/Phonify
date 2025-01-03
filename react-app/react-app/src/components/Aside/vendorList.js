import React from "react";

const VendorList = ({ vendors, selectedVendors, onVendorChange }) => {
  const toggleVendor = (vendor) => {
    if (selectedVendors.includes(vendor)) {
      onVendorChange(selectedVendors.filter((v) => v !== vendor));
    } else {
      onVendorChange([...selectedVendors, vendor]);
    }
  };

  return (
    <div>
      <h4>Vendors</h4>
      {vendors.map((vendor) => (
        <div key={vendor}>
          <input
            type="checkbox"
            checked={selectedVendors.includes(vendor)}
            onChange={() => toggleVendor(vendor)}
          />
          <label>{vendor}</label>
        </div>
      ))}
    </div>
  );
};

export default VendorList;
