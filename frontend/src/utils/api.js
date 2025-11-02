import axios from "axios";

const req = axios.create({
  baseURL: "http://localhost:3000",
});
req.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token || typeof token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return error;
  }
);
export function get(uri) {
  return req
    .get(uri, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response?.data?.message || err.message);
    });
}
export function post(uri, data, headers) {
  return req
    .post(uri, data, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response?.data?.message || err.message);
    });
}
export function patch(uri, data, headers) {
  return req
    .patch(uri, data, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response?.data?.message || err.message);
    });
}
export function del(uri) {
  return req
    .delete(uri, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response?.data?.message || err.message);
    });
}
