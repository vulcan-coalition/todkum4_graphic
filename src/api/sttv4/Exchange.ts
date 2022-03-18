import { httpClient } from "../http-client";

export const Exchange = () => {
    const formData = new FormData();
    const token = localStorage.getItem("token")
    if (token != null) {
        formData.append('token', token);
    }
    return httpClient
        .post("/exchange", formData)
        .then(res => {
            if (res.status === 200) {
                return res.data
            }
        })
        .catch(error => {
            console.log("err :: ", error);
        });
};
