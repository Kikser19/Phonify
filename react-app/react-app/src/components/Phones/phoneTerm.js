import React from "react";
import { useNavigate } from "react-router-dom";

const PhoneTerm = (props) => {
  const navigate = useNavigate();

  function formatModelName(modelName) {
    var name = modelName.toLowerCase().replace(/\s+/g, '-');
    if (name.startsWith("samsung")) {
      return `${name}-5g`;
    }
    if (name.startsWith("iphone-14-pro-max") || name.startsWith("iphone-15-plus")) {
      return `${name}-`;
    }
    if (name.startsWith("iphone-se")) {
      return `${name}-2022`;
    }
    if (name.startsWith("rog-phone-6-batman-edition")) {
      return name.replace('-edition', "");
    }
    if (name.startsWith("zenfone-10")) {
      return name.replace('zenfone-10', "zenfone10");
    }
    return name;
  }

  const handleCardClick = () => {
    navigate(`/phone-details`, { state: { brand: props.term.brand, model: props.term.model, imageLink: imageUrl } });
  };

  const imageUrl = `https://fdn2.gsmarena.com/vv/bigpic/${props.term.brand.toLowerCase()}-${formatModelName(props.term.model)}.jpg`;

  return (
    <div
      className="card"
      onClick={handleCardClick}
      style={{
        cursor: "pointer",
        backgroundColor: "#fff",
        borderRadius: "12px", // More rounded for premium feel
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)", // Enhanced shadow for depth
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition
        margin: "20px",
        width: "100%",
        maxWidth: "280px", // Slightly wider for a more premium look
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 18px 36px rgba(0, 0, 0, 0.15)"; // Deep shadow on hover
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.1)"; // Reset shadow
      }}
    >
      <div className="card-body" style={{ padding: "16px", textAlign: "center" }}>
        <img
          src={imageUrl}
          alt={`${props.term.brand} ${props.term.model}`}
          className="card-img-top"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "10px", // Slightly more rounded
            objectFit: "contain",
            maxHeight: "220px",
            transition: "transform 0.3s ease",
          }}
        />
        <h5
          className="card-title"
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#333", // Rich dark gray for a premium look
            marginTop: "12px",
            textTransform: "uppercase", // Uppercase for more refined look
          }}
        >
          {props.term.brand} {props.term.model}
        </h5>
        <p
          className="card-text"
          style={{
            fontSize: "14px",
            color: "#555", // Softened gray for readability
            marginTop: "8px",
          }}
        >
          Cheapest Price: <strong style={{ color: "#558b71", fontSize: "18px",fontWeight: "500" }}>{props.term.cheapestPrice} ден.</strong>
        </p>
        <p
          className="card-text"
          style={{
            fontSize: "14px",
            color: "#777", // Slightly lighter gray
          }}
        >
          Offers: {props.term.offerCount}
        </p>
      </div>
      <style>
        {`
          .card:hover img {
            transform: scale(1.05); // Slight zoom on image for effect
          }

          @media (max-width: 768px) {
            .card {
              max-width: 240px;
            }
            .card-title {
              font-size: 14px;
            }
            .card-text {
              font-size: 12px;
            }
            .card-img-top {
              max-height: 180px;
            }
          }

          @media (max-width: 480px) {
            .card {
              max-width: 180px;
            }
            .card-title {
              font-size: 12px;
            }
            .card-text {
              font-size: 10px;
            }
            .card-img-top {
              max-height: 140px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default PhoneTerm;