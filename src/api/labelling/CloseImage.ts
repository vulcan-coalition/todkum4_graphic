import { httpClient } from "../http-client";

const CloseImage = async (type: string) => {
    try {
        const res = await httpClient.patch("image/close-image", {type: type})
        return res
    } catch (err) {
        console.log("err :: ", err);
    }
};


export default CloseImage