import axios from "axios";
import { API_ENDPOINT } from "../constants";

export function postDailyPicks(userid, data) {
  return axios.post(`${API_ENDPOINT}/game-picks`, {
    user: userid,
    picks: data,
  });
}

export function putDailyPicks(userid, data) {
  return axios.put(`${API_ENDPOINT}/game-picks/${userid}`, {
    picks: data,
  });
}

export function getDailyPicks(userid) {
  return axios.get(`${API_ENDPOINT}/game-picks/${userid}`);
}
