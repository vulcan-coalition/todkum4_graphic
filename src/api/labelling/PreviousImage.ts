import { httpClient } from "../http-client";

const PreviousImage = async (type: string) => {
    try {
        const res = await httpClient.patch("image/prev-image",{type: type})
        return res
    } catch (err) {
        console.log("err :: ", err);
    }
};


export default PreviousImage