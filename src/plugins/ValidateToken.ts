export const isTokenExpire = (rawToken: string) => {
    const jwtDecode = require('jwt-decode');
    let token;
    try {
        token = jwtDecode(rawToken);
    }
    catch (err) {
        return true;
    }
    const expireDate = new Date(token.exp * 1000);
    const dateNow = new Date();
    return expireDate.getTime() < dateNow.getTime();
}

export const getTokenExp = (rawToken: string) => {
  const jwtDecode = require('jwt-decode');
  let token;
  try {
    token = jwtDecode(rawToken)
  }
  catch (err) {
    return
  }
  const expireDate = new Date(token.exp * 1000).toString();
  return expireDate
}