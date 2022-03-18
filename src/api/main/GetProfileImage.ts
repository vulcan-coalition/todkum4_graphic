import { httpClient } from "../http-client";

const GetProfileImage = () => {
    return httpClient
    .get("/users/account-setting")
    .then(res => {
      if (res.status === 200) {
        return res.data.image;
      }
    })
    .catch(error => {
      console.log("err :: ", error);
    });
  };
  
  export default GetProfileImage
  