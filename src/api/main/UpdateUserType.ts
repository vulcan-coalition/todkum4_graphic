import { httpClient } from "../http-client";

const UpdateUserType = (userType: number | undefined) => {
  return httpClient
    .patch(`/users/user-type?user_type=${userType}`, {})
    .then(res => {
      if (res.status === 200) {
        return;
      }
    })
    .catch(error => {
      console.log("err :: ", error);
    });
};

export default UpdateUserType