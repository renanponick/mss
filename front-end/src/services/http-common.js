import axios from "axios";

export default axios.create({
    baseURL: "https://pure-shelf-85340.herokuapp.com/mss",
    headers: {
        "Content-type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("user-token")}`
    }
});