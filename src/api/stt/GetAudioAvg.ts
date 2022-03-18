import { httpClient } from "../http-client";

const GetAudioAvg = () => {
    return httpClient
    .get("/books/avg")
    .then(res => {
      if (res.status === 200) {
        return res.data
      }
    })
    .catch(error => {
      console.log("err :: ", error);
    });
  };
  
  export default GetAudioAvg
  