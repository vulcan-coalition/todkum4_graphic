import { httpClient } from "../http-client";
import { resetPasswordAPI } from "../../constants";

export const SendEmailAPI = (data: any) => {
  return httpClient
    .get(resetPasswordAPI + `?email=${data.email}`, {})
    .then((res) => {
      if (res.status === 200) {
        return;
      }
    })
    .catch(() => {
      return Promise.reject();
    });
};

export default SendEmailAPI;
