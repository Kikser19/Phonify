import React from 'react';

const PhoneTerm = (props) => {

    function formatModelName(modelName) {
        return modelName
          .toLowerCase()
          .replace(/\s+/g, '-'); // Replace spaces with dashes
    }

    // Format the model name for the image URL
    const imageUrl = `https://fdn2.gsmarena.com/vv/bigpic/${props.term.brand}-${formatModelName(props.term.model)}.jpg`;
    console.log(imageUrl)
    return (
        <div className="card">
            <div className="card-body">
                <img src={imageUrl} alt={`${props.term.brand} ${props.term.model}`} className="card-img-top" />
                <h5 className="card-title">{props.term.brand} {props.term.model}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">Vendor: {props.term.vendor}</h6>
                <a href={`${(props.term.link)}`} className="card-text">
                    Brand: {props.term.brand}
                </a>
                <p className="card-text">Model: {props.term.model}</p>
                <p className="card-text">Price: {props.term.price}</p>
            </div>
        </div>
    );
}

export default PhoneTerm;
