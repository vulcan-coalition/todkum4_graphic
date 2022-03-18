import { httpClient } from "../http-client";

const UpdateProfileImage = (imgFile: any) => {
  return httpClient
  .post("/users/profile-image", imgFile, {
    headers: {
      "Content-Type": "multipart/form-data",
    },})

  .then(res => {
    if (res.status === 200) {
      return;
    }
  })
  .catch(error => {
    console.log("err :: ", error);
  });
};

export default UpdateProfileImage;
