import axios from "axios";

const AxiosInst = axios.create({
    baseURL: "http://127.0.0.1:6969/",
});

export default AxiosInst;
