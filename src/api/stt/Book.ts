import { httpClient } from "../http-client";
import { from } from 'rxjs';
import { map, retry } from 'rxjs/operators';

const GetBookName = (type: string) => {
  return from(
    httpClient
      .get(`users/book-name?type=${type}`)
      .then(res => {
        if (res.status === 200) {
          return res.data;
        }
      })
  ).pipe(
    map(response => response),
    retry(5)
  );
};


export default GetBookName
