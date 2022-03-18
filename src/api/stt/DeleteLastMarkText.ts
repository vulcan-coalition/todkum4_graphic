import { httpClient } from "../http-client";

const DeleteLastMarkText = (type: string) => {
  return httpClient
    .delete(`/stt/mark-text?type=${type}`)
    .then(res => {
      return res.data;
    });
};

export default DeleteLastMarkText
