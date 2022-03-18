import { httpClient } from "../http-client";

const CreateMarkText = (markData: object, type: string) => {
  return httpClient
    .post(`/stt/mark-text?type=${type}`, markData)
    .then(res => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log("err :: ", error);
    });
};

export default CreateMarkText
