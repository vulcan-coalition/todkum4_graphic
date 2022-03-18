import { httpClient } from "../http-client";

const GetNotificationDetails = () => {
  return httpClient
    .get("/notice-details", {})
    .then(res => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch(error => {
      console.log("err :: ", error);
    });
};

export default GetNotificationDetails