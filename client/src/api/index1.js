import { queryClient } from "..";
// import { APP_TOKENS } from "@/utils/constants";
import axios from "axios";

const BASE_URL="http://localhost:8081/api/v1"



export const axiosInstance = axios.create({
//   baseURL: process.env.BASE_URL,
baseURL: BASE_URL
});
export const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b2NodWt3dS51ZG9jaHVrd3VjQGdtYWlsLmNvbSIsImlhdCI6MTcyMzg2NzU0MCwiZXhwIjoxNzIzOTI1MTQwfQ.UxE-XXKXe59Ydyaiu5JnHN6uTOmc9qpIzJZb_aF84ps"
// export const token ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b2NodWt3dS51ZG9jaHVrdzMxQGdtYWlsLmNvbSIsImlhdCI6MTcyMjUxMzA0NywiZXhwIjoxNzIyNTcwNjQ3fQ.7oj2g_G1IwO_nQKHDT8PEMsKkOtQIpb_ymWeAj1VhNw";


const addTokenToRequest = (request) => {
//   const token = Cookies.get(APP_TOKENS.ACCESS_TOKEN);
  request.headers.Authorization = `Bearer ${token}`;
  return request;
};

// axiosInstance.interceptors.request.use(addTokenToRequest);

// axiosInstance.interceptors.response.use(
//   function (response) {
//     if (response.status === 401 && window.location.pathname !== "/login") {
//       Cookies.remove(APP_TOKENS.ACCESS_TOKEN);
//       Cookies.remove(APP_TOKENS.CATEGORY);
//       Cookies.remove(APP_TOKENS.REFRESH_TOKEN);
//       window.location.href = "/login";
//       queryClient.clear();

//       return;
//     } else return response;
//   },
//   function (error) {
//     if (
//       error.response.status === 401 &&
//       window.location.pathname !== "/login"
//     ) {
//       Cookies.remove(APP_TOKENS.ACCESS_TOKEN);
//       Cookies.remove(APP_TOKENS.CATEGORY);
//       Cookies.remove(APP_TOKENS.REFRESH_TOKEN);

//       window.location.href = "/login";
//       queryClient.clear();
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );