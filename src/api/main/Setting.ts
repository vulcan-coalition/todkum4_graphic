import { httpClient } from "../http-client";


export const GetSettings = () => {
  return httpClient
    .get("/setting", {})
    .then(res => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch(error => {
      console.log("err :: ", error);
    });
};

const UpdateSettings = (data: object) => {
  return httpClient
  .patch("/setting", data)
  .then(res => {
    if (res.status === 200) {
      return;
    }
  })
  .catch(error => {
    console.log("err :: ", error);
  });
};

export default UpdateSettings