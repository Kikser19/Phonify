import React from "react";
const Header = ({ onFilterChange,totalOffers }) => {
  const currentDate = new Date().toLocaleDateString("mk-MK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
    const handleFilterChange = (value) => {
        onFilterChange({ brands: [value] }); // Replace the array with a single selected vendor
    };

  return (
    <div className="header">
      <div className="header-top">
        <span>Вкупно: {totalOffers} понуди</span> {/* Dynamic total offers */}
        <span>Обновено: {currentDate}</span> {/* Dynamic current date */}
      </div>
      <div className="header-title">
        <h1>Phonify</h1>
      </div>
      <div className="header-nav">
        <ul style={{display:"flex", justifyContent:"space-between"}}>
          <li onClick={()=>{handleFilterChange("Xiaomi")}}>Xiaomi</li>
          <li onClick={()=>{handleFilterChange("Samsung")}}>Samsung</li>
          <li onClick={()=>{handleFilterChange("Apple")}}>Apple</li>
          <li onClick={()=>{handleFilterChange("Poco")}}>Poco</li>
          <li onClick={()=>{handleFilterChange("Huawei")}}>Huawei</li>
          <li onClick={()=>{handleFilterChange("Motorola")}}>Motorola</li>
          <li onClick={()=>{handleFilterChange("OnePlus")}}>OnePlus</li>
          <li onClick={()=>{handleFilterChange("Honor")}}>Honor</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
