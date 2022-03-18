import { httpClient } from "../http-client";

const GetCloseMission = async () => {
  try {
    const res = await httpClient.patch("/mission/close-mission");
    return res.data
  } catch (error) {
    console.log(error);
  }
};

export default GetCloseMission;
