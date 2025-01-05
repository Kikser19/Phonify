import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PhonesService from "../../repository/phones";
import Images from "../../vendorImages/vendorImages";


const PhoneDetailsPage = () => {
    const location = useLocation();
    const { brand, model, imageLink } = location.state; // Get brand and model from navigation state
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        console.log(brand);
        console.log(model);
        // Fetch phone offers from the backend
        const fetchOffers = async () => {
            try {
                const response = await PhonesService.fetchPhoneOffers(brand, model);
                setOffers(response.data);
            } catch (error) {
                console.error("Failed to fetch offers", error);
            }
        };

        fetchOffers();
    }, [brand, model]);



    return (
        <div>
            <img src={imageLink} alt={`${brand} ${model}`} />
            <h1>{brand} {model} - Offers</h1>
            {offers.length > 0 ? (
                <ul>
                    {offers.map((offer, index) => {
                        return (
                            <li key={index}>
                                {offer.vendor && (
                                    <div>
                                        <img src={Images.getVendorImage(offer.vendor)} alt={offer.vendor} />
                                    </div>
                                )}
                                Vendor: {offer.vendor}, Price: {offer.price}, Name: {offer.wholeName}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No offers available for this phone.</p>
            )}
        </div>
    );
};

export default PhoneDetailsPage;
