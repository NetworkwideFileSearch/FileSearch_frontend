import axios from "axios";

const AxiosInst = axios.create({
  baseURL: "http://localhost:6969/",
});

export default AxiosInst;
