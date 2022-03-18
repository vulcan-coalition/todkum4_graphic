import { httpClient } from "../http-client";

const CreateMarkCar = async (data: object) => {
  try {
    const res = await httpClient.post("/vision/mark-car", data);
    return res.data
  } catch (error) {
    console.log("err::", error);
    return false
  }
};

export default CreateMarkCar;
