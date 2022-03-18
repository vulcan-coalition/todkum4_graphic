import { httpClient } from "../http-client";

const UpdateUser = () => {
  return httpClient
    .patch("/users/tutorial", {})
    .then(res => {
      if (res.status === 200) {
        return;
      }
    })
    .catch(error => {
      console.log("err :: ", error);
    });
};

export default UpdateUser