import { httpClient } from "../http-client";

const SaveAudio = async (data: FormData) => {
  try {
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    const res = await httpClient.post("/mission/save", data, config);
    return res.data
  } catch (error) {
    console.log(error);
  }
};

export default SaveAudio;
