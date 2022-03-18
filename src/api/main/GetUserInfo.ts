import { httpClient } from "../http-client";

const GetUserInfo = () => {
  return httpClient
    .get("/users/info", {})
    .then(res => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch(error => {
      console.log("err :: ", error);
    });
};

export default GetUserInfo
