import axios from "axios";
import Payment from "../../database/models/payment.js";
import _ from "lodash";
import { paystack } from "../../utils/paystack.js";
const { initializePayment } = paystack(axios);

export default function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = _.pick(data, [
        "amount",
        "email",
        "fullname",
        "userId",
        "orderId",
      ]);
      formData.metadata = {
        full_name: formData.fullname,
        sessionId: formData.sessionId,
        userId: formData.userId,
        orderId: formData.orderId,
      };
      formData.amount *= 100;
      const response = await initializePayment(formData);
      return resolve(response.data);
    } catch (error) {
      error.source = "Start Payment Service";
      return reject(error);
    }
  });
}
