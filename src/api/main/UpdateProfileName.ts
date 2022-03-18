import { httpClient } from "../http-client";

const UpdateProfileName = (nickname: string) => {
  return httpClient
  .patch("/users", {"nickname": nickname})
  .then(res => {
    if (res.status === 200) {
      return;
    }
  })
  .catch(error => {
    console.log("err :: ", error);
  });
};

export default UpdateProfileName
