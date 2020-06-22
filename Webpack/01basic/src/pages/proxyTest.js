import axios from "axios"
axios.get("/api/info").then(res => {
    console.log(res.data)
});