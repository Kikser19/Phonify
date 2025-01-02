import React from "react";
const Header = ({ totalOffers }) => {
  const currentDate = new Date().toLocaleDateString("mk-MK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
        <ul>
          <li>Xiaomi</li>
          <li>Samsung</li>
          <li>Apple</li>
          <li>Poco</li>
          <li>Huawei</li>
          <li>Motorola</li>
          <li>OnePlus</li>
          <li>Honor</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
