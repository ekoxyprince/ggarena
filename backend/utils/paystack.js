import env from "../config/env.js";

const paystack_key = env.paystack_key;

const paystack = (request) => {
  const initializePayment = (body) => {
    const options = {
      url: "https://api.paystack.co/transaction/initialize",
      headers: {
        Authorization: "Bearer " + paystack_key,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
      body,
    };
    return request.post(
      options.url,
      { ...options.body },
      { headers: options.headers }
    );
  };
  const verifyPayment = (ref) => {
    const options = {
      url:
        `https://api.paystack.co/transaction/verify/` + encodeURIComponent(ref),
      headers: {
        Authorization: "Bearer " + paystack_key,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    };
    return request.get(options.url, { headers: options.headers });
  };
  return { initializePayment, verifyPayment };
};

export { paystack };
