import axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:7250',
    headers:{
        'Access-Control-Allow-Origin' : '*'
    }
})

export default instance;