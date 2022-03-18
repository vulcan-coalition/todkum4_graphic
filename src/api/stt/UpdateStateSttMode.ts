import { httpClient } from "../http-client";

import { UpdateStateSttModeRequest } from "../../models/user";

const UpdateStateSttMode = (data: UpdateStateSttModeRequest) => {
  return httpClient
    .patch("/users/status-stt-mode", data)
    .then((res) => {
      if (res.status === 200) {
        return res;
      }
    })
    .catch((error) => {
      console.log("err :: ", error);
    });
};

export default UpdateStateSttMode;
