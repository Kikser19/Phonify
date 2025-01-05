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
        navigate(`/phone-details`, { state: { brand: props.term.brand, model: props.term.model,imageLink:imageUrl } });
    };
    const imageUrl = `https://fdn2.gsmarena.com/vv/bigpic/${props.term.brand.toLowerCase()}-${formatModelName(props.term.model)}.jpg`;

    return (
        <div className="card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
            <div className="card-body">
                <img src={imageUrl} alt={`${props.term.brand} ${props.term.model}`} className="card-img-top" />
                <h5 className="card-title">{props.term.brand} {props.term.model}</h5>
                <p className="card-text">Cheapest Price: {props.term.cheapestPrice}</p>
                <p className="card-text">Offers: {props.term.offerCount}</p>
            </div>
        </div>
    );
};

export default PhoneTerm;
