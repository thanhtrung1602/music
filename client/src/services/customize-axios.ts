import axios from "axios";

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_PORT_SERVER}`,
});

instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default instance;