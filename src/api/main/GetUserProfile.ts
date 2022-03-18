import { httpClient } from "../http-client";

const GetUserProfile = () => {
  return httpClient
    .get("/users/profile", {})
    .then(res => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch(error => {
      console.log("err :: ", error);
    });
};

export default GetUserProfile
