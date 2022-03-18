import { httpClient } from "../http-client";
import LocalStorage from "../../constants/LocalStorage";
import { getTokenExp } from "../../plugins/ValidateToken";
export const Authen = (username: string, password: string) => {

  const setAuthen = (data: any) => {
    LocalStorage.setItem("token", data.accessToken, getTokenExp(data.accessToken));
    LocalStorage.setItem("refreshToken", data.refreshToken, getTokenExp(data.refreshToken));
  };

  return httpClient
    .post("/user/login", { username, password })
    .then(res => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .then(data => {
      setAuthen(data);
      return data;
    })
    .catch(error => {
      console.log("err :: ", error);
    });
};

export const Logout = () => {
  return httpClient
    .post("/user/logout")
    .then(res => {
      if (res.status === 200) {
        LocalStorage.clearStore(); // clear cookie
        localStorage.removeItem("currentReview");
        localStorage.removeItem("currentIndex");
      }
    })
    .catch(error => {
      console.log("err :: ", error);
    });
};