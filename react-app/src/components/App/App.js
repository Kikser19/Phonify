import React, { useState, useEffect } from "react";
import PhonesService from "../../repository/phones";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Phones from "../Phones/phonesList";

const App = () => {
  const [phones, setPhones] = useState([]);

  // Fetch the phones when the component mounts
  useEffect(() => {
    loadPhones();
  }, []); // Empty dependency array to run the effect once on mount

  // Function to load phones from the API
  const loadPhones = () => {
    PhonesService.fetchPhones()
      .then((response) => {
        console.log("Response from API:", response);
        // Assuming the data you want is in response.data
        setPhones(response.data); // Update state with the fetched phones data
      })
      .catch((error) => {
        console.error("Error fetching phones:", error);
      });
  };

  return (
    <div>
      <Router>
        <main>
          <div className={"container"}>
            {<Routes>
              <Route path={"/"} element={<Phones phones={phones} />} />
            </Routes>}
          </div>
        </main>
      </Router>
    </div>
  );
};

export default App;
