import { httpClient } from "../http-client";

const UpdateMark = async (data: object) => {
  try {
    const res = await httpClient.put("/vision/mark-car", data);
    if (res.status === 202) {
      return res.data;
    }
  } catch (error) {
    console.log("err::", error);
    return false
  }
};

export default UpdateMark;
