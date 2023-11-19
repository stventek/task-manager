import axios from "axios";
import { getAccessToken } from "./get-jwt";

export function isAuthenticated() {
  return axios.post(process.env.NEXT_PUBLIC_API_BASE + "/api/token/verify/", {
    token: getAccessToken(),
  });
}
