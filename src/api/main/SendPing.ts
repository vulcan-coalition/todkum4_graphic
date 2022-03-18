import { httpClient } from "../http-client";

export const SendPing  = (echo: string) => {
  return httpClient
    .get(`/users/ping?echo=${echo}`, {})
    .then(res => {
      if (res.status === 200) {
        return res.status;
      }
    })
    .catch(error => {
      console.log("err :: ", error);
    });
};

export default SendPing;
