import axios from "axios";
import { API_ENDPOINT } from "../constants";

export function loginRequest(data) {
  return axios.post(API_ENDPOINT + "/auth/login", {
    username: data.username,
    password: data.password,
  });
}
