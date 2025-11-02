import { useQuery } from "@tanstack/react-query";
import { get } from "../utils/api";

export default function useFetch(data) {
  return useQuery({
    queryKey: [data.key],
    queryFn: () => {
      console.log("making request");
      return get(data.url).then((resp) => {
        console.log("Response", resp);
        return resp.data;
      });
    },
  });
}
