import { httpClient } from "../http-client";

const Project = (type: string) => {
   return httpClient
    .post(`/dict/project?type=${type}`, {})
    .then(res => {
      if (res.status === 200) {
        return;
      }
    })
    .catch(error => {
      console.log("err :: ", error);
    });
};

export default Project