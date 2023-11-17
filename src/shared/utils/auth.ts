import axios from "axios";

export function isAuthenticated() {
  return axios.post(process.env.NEXT_PUBLIC_API_BASE + "/api/token/verify/", {
    token: globalThis.localStorage.getItem("accessToken"),
  });
}
