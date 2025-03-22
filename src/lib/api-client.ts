import Axios, { InternalAxiosRequestConfig } from "axios";

import { env } from "@/config/env";
import { paths } from "@/config/paths";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  // Set default Accept header
  if (config.headers) {
    config.headers.Accept = "application/json";
  }

  // Set withCredentials to true, which includes cookies and credentials with the request
  // config.withCredentials = true;

  // Retrieve token from localStorage or sessionStorage
  const storedState = localStorage.getItem("auth-storage"); // Or sessionStorage

  const authState = storedState ? JSON.parse(storedState) : null;
  const token = authState?.state?.token;

  // If a token exists, add it to the Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.warn(message);
    // useNotifications.getState().addNotification({
    //   type: "error",
    //   title: "Error",
    //   message,
    // });

    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams();
      const redirectTo =
        searchParams.get("redirectTo") || window.location.pathname;
      window.location.href = paths.auth.login.getHref(redirectTo);
    }

    return Promise.reject(error);
  }
);
