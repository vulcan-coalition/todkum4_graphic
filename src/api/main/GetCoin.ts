import { httpClient } from "../http-client";

const GetCoin = (fromtime: string, totime: string, user_id: string) => {
    return httpClient
        .get("overlord/coins"
            , { params: { fromtime, totime, user_id } })
        .then(res => {
            if (res.status === 200) {
                return res.data;
            }
        })
        .catch(error => {
            console.log("err :: ", error);
        });
};

export default GetCoin