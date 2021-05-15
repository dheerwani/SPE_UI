import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8764/",
    headers: {
        "Content-type": "application/json"
    }
});