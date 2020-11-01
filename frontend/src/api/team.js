import axios from "axios";
import { API_ENDPOINT } from "../constants";

export function playerRequest() {
  return axios.get(`${API_ENDPOINT}/team`);
}

