import axios from "axios";
import store from "@/store";

export default () => {
  const apiUrl = process.env.VUE_APP_API_URL;
  const Axios = axios.create({ baseURL: apiUrl });

  console.log("api", process.env.VUE_APP_API_URL);

  Axios.interceptors.response.use(
    response => {
      store.commit("requestComplete");
      return response;
    },
    error => {
      // Do something with error
      store.commit("requestComplete");
      return Promise.reject(error);
    }
  );

  Axios.interceptors.request.use(config => {
    store.commit("requestInProgress");
    return config;
  });

  return Axios;
};
