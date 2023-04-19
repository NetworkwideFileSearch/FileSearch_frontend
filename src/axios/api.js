import AxiosInst from "./instance";

const API = {
  rediscover: () => AxiosInst.get(`rediscover`),
  search: (query) => AxiosInst.get(`search/${query}`),
};

export default API;
