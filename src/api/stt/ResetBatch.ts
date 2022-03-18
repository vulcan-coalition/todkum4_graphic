import { httpClient } from "../http-client";

const ResetBatch = (type: string) => {
   return httpClient
   .delete(`/stt/mark-text/reset?type=${type}`)
   .then(res => {
     return res.data;
   });
};

export default ResetBatch