import { httpClient } from "../http-client";

const GetOldMarkCar = async (type: string) => {
  try {
    const res = await httpClient.get("/vision/old-mark", {
      params: {
        type: type,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log("err :: ", err);
    return false;
  }
};
export default GetOldMarkCar;
