import { httpClient } from "../http-client";

const AddWorkLog = (
  application: string,
  actionType: string,
  amountOfWork: number,
  IsUpdate: boolean
) => {
  return httpClient
    .post("/worklog/", {
      'application': application,
      'actionType': actionType,
      'amountOfWork': amountOfWork,
      'IsUpdate': IsUpdate,
    })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((error) => {
      console.log("err :: ", error);
    });
};

export default AddWorkLog;
