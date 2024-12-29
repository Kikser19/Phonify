import axios from "../custom-axios/axios";

const PhonesService = {
    fetchPhones: () => {
        return axios.get("/phones");
    }
};

export default PhonesService;
