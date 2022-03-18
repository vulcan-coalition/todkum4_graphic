import { httpClient } from "../http-client";

export const GetUserWork = () => {
    return httpClient
        .get("/user/work")
        .then(res => {
            if (res.status === 200) {
                return res.data
            }
        })
        .catch(error => {
            console.log("err :: ", error);
        });
};

export const GetSection = (book_id: string, section_index: string) => {
    return httpClient
        .get(`/section?book_id=${book_id}&section_index=${section_index}`)
        .then(res => {
            if (res.status === 200 || res.status === 303) {
                return res.data
            }
        })
        .catch(error => {
            return error.response
        });
};


export const NextSection = (label: object, book_id: string, section_index: string) => {
    return httpClient
        .post(`/section?book_id=${book_id}&section_index=${section_index}`, label)
        .then(res => {
            if (res.status === 200) {
                return res.data
            }
        })
        .catch(error => {
            console.log("err :: ", error);
        });
};
