import axios from "axios";

const Axios = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL_API,
});
export const authAxios = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL_ACCOUNT,
});

export default Axios;

export const authorize = (access_token: string) => {
  Axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
  return Axios;
};

export const authorizeClient = (client_token: string) => {
  Axios.defaults.headers.common["Authorization"] = "Bearer " + client_token;
  return Axios;
};
