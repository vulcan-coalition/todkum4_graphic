import { httpClient } from "../http-client";

const GetCurrentMission = async () => {
  try {
    const res = await httpClient.get("/mission/current-mission");
    return res.data
  } catch (error) {
    console.log(error);
  }
};

export default GetCurrentMission;
