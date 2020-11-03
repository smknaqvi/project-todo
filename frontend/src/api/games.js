import axios from "axios";
import { API_ENDPOINT } from "../constants";

export function gamesRequest() {
  return axios.get(`${API_ENDPOINT}/games/`);
}


