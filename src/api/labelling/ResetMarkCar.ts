import { httpClient } from "../http-client";

export const ResetMarkCar = async (type: string) => {
    try {
      const res = await httpClient.delete("/vision/mark-car/reset", {
        params: {
          type: type,
        },
      })
      if (res.status == 200) {
        return res.data
      }
    } catch (error) {
      console.log("err :: ", error)
      return false
    }
  };

  export default ResetMarkCar
