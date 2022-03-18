import { httpClient } from "../http-client";

const UpdateFristDayOfWeek = () => {
  return httpClient
    .post("/users/first-date-week")
    .then(res => {
      if (res.status === 200) {
        return res;
      }
    })
    .catch(error => {
      console.log("err :: ", error);
    });
};

export default UpdateFristDayOfWeek


