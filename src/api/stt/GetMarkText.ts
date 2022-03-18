import { httpClient } from "../http-client";

const GetMarkText = (time: number, type: string) => {
  return httpClient
    .get(`/stt/mark-text?type=${type}` , {
      headers: {
        'from': 0,
        'to' : time
      }
    })
    .then(res => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch(error => {
      console.log("err :: ", error);
    });
};

export default GetMarkText
