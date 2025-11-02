import { useMutation } from "@tanstack/react-query";
import { post, patch, del } from "../utils/api";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const useMutate = (url, key, type, headers) => {
  function queryFn(type) {
    switch (type) {
      case "post":
        return post;
      case "patch":
        return patch;
      case "delete":
        return del;
    }
  }
  return useMutation({
    mutationFn: (data) => {
      return queryFn(type)(url, data, headers);
    },
    mutationKey: key,
    onError: (err) => {
      console.log(err);
      toast.error(err.message, {
        position: "top-center",
        duration: 1500,
      });
    },
    onSuccess: (resp) => {
      toast.success(resp.message, {
        position: "top-center",
        duration: 1500,
      });
    },
  });
};

export default useMutate;
