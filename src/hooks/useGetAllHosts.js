import { useQuery } from "react-query";
import API from "../axios/api";

const useGetAllHosts = () => {
  return useQuery({
    queryKey: ["hosts"],
    queryFn: async () => {
      const { data } = await API.rediscover();
      return data?.hosts;
    },
  });
};

export default useGetAllHosts;
