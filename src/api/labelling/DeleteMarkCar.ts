import { httpClient } from "../http-client";

const DeleteMarkCar = async (type: string, dataID: string ) => {
  try {
    const res = await httpClient.delete(`vision/mark-car?dataID=${dataID}&type=${type}`)
    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.log("err :: ", err);
    return false
  }
};
export default DeleteMarkCar 