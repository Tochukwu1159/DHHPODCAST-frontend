import { queryClient } from "..";
// import { APP_TOKENS } from "@/utils/constants";
import axios from "axios";


const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaHJpc3Rpbm90b2NodWt3dUBnbWFpbC5jb20iLCJpYXQiOjE3MjM5OTU3NTMsImV4cCI6MTcyNDA1MzM1M30._uahagr3AMcK1TiXrsuQZGLwxEYvGqXtE38Vao60aQ8"


export const axiosInstance = axios.create({
    baseURL: "https://dhhpodcast-cau6.onrender.com/api/v1",
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});


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