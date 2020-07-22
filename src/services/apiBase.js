import axios from "axios";

export default () => {
  const apiUrl = process.env.VUE_APP_API_URL;
  const Axios = axios.create({ baseURL: apiUrl });

  Axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      // Do something with error
      return Promise.reject(error);
    }
  );

  return Axios;
};
