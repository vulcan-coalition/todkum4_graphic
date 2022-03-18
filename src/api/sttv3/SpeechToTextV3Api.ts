import { httpClient } from "../http-client";

export const GetMarkSound = () => {
  return httpClient
    .get("/stt-v3/mark-sound")
    .then(res => {
      if (res.status === 200) {
        return res.data
      }
    })
    .catch(error => {
      console.log("err :: ", error);
    });
};

export const AddMarkSound = (labels: object) => {
  return httpClient
    .post("/stt-v3/mark-sound", labels)
    .then(res => {
      if (res.status === 200) {
        return res.data
      }
    })
    .catch(error => {
      console.log("err :: ", error);
    });
};

export const DeleteMarkSound = (id: string) => {
  return httpClient
    .delete(`/stt-v3/mark-sound?labelID=${id}`)
    .then(res => {
      if (res.status === 200) {
        return res
      }
    })
    .catch(error => {
      console.log("err :: ", error);
    });
};

export const UpdateMarkSound = (labels: object) => {
  return httpClient
    .put("/stt-v3/mark-sound", labels)
    .then(res => {
      if (res.status === 200) {
        return res.data
      }
    })
    .catch(error => {
      console.log("err :: ", error);
    });
};

export const NextSound = () => {
  return httpClient
    .patch("/stt-v3/close-sound")
    .then(res => {
      return res
    })
    .catch(error => {
      console.log("err :: ", error);
    });
};

export const PreviousSound = () => {
  return httpClient
    .patch("/stt-v3/prev-sound")
    .then(res => {
      return res
    })
    .catch(error => {
      console.log("err :: ", error);
    });
};
export const GetCurrentBook = () => {
  return httpClient
    .get("/stt-v3/book-name")
    .then(res => {
      if (res.status === 200) {
        return res.data
      }
    })
    .catch(error => {
      console.log("err :: ", error);
    });
};
export  const  GetCategory = () => {
  return httpClient
    .get("/stt-v3/category")
    .then(res => {
      if (res.status === 200) {
        return res.data
      }
    })
    .catch(error => {
      console.log("err :: ", error);
    });
}

export  const  InitialData = () => {
  return httpClient
    .get("/stt-v3/initial")
    .then(res => {
      if (res.status === 200) {
        return res.data
      }
    })
    .catch(error => {
      console.log("err :: ", error);
    });
}