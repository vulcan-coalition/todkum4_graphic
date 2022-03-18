import { httpClient } from "../http-client";

const UpdateCoins = (
  type: string,
  totalTime: number = 0,
  coins: number = 0
) => {
  return httpClient
    .patch(`/users?type=${type}`, { totalTime: totalTime, coins: coins })
    .then((res) => {
      if (res.status === 200) {
        return;
      }
    })
    .catch((error) => {
      console.log("err :: ", error);
    });
};

export default UpdateCoins;
