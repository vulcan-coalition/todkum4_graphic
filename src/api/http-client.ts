import axios from "axios";
import { baseurl } from "../constants";
import LocalStorage from "../constants/LocalStorage";
import { getTokenExp } from "../plugins/ValidateToken"

enum StatusResponse {
  Unauthorized = 401,
  Created = 201,
}
enum ErrorMessage {
  MissingToken = "missing or malformed jwt"
}

const instance = axios.create({
  baseURL: baseurl
});
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  })

  failedQueue = [];
}

instance.interceptors.request.use(
  config => {
    var url = window.location.href.split("/")[3]
    if (url === "reset-password") {
      LocalStorage.setItem(`token_exchange`, window.location.href.split("/")[4])
    }
    const token = LocalStorage.getItem(`token_exchange`) ? LocalStorage.getItem(`token_exchange`) : "";
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response;
  }, (error) => {
    const originalRequest = error.config;
    const status = error.response.status;
    const errMsg = error.response.data.message;
    const isUnauthorized = (status === StatusResponse.Unauthorized || errMsg === ErrorMessage.MissingToken)

    if (isUnauthorized && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axios(originalRequest);
        }).catch(err => {
          console.log(err);
          
          return Promise.reject(err);
        })
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(function (resolve, reject) {
        axios.post(`${baseurl}/refresh`, {
          "refresher": LocalStorage.getItem("refresh_token_exchange")
        })
          .then(({ data }) => {
            LocalStorage.setItem("token_exchange", data.access_token, getTokenExp(data.access_token));
            LocalStorage.setItem("refresh_token_exchange", data.refresh_token, getTokenExp(data.refresh_token));
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
            originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;
            processQueue(null, data.accessToken);
            resolve(axios(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
            LocalStorage.clearStore();
            window.parent.location.href = window.location.ancestorOrigins[0];
          })
          .finally(() => { isRefreshing = false })
      })

    }
    return Promise.reject(error);
  }
);

export const httpClient = instance;