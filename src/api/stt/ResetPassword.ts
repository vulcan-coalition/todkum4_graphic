import { httpClient } from "../http-client";
import { resetPasswordAPI } from "../../constants";

export const ResetPasswordAPI = (data: object) => {
  return httpClient
    .patch(resetPasswordAPI, data)
    .then((res) => {
      if (res.status === 200) {
        return;
      }
    })
    .catch((error) => {
      console.log("err :: ", error);
      return Promise.reject();
    });
};

export default ResetPasswordAPI;
