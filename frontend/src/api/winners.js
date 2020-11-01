import axios from "axios";
import { API_ENDPOINT } from "../constants";

export function getWinners(year) {
  return axios.get(`${API_ENDPOINT}/winners/${year}`);
}
