import axios from "axios";
import { API_ENDPOINT } from "../constants";

export function postPredictions(year, userid, data, results, isEvaluated) {
  return axios.post(`${API_ENDPOINT}/user-picks`, {
    year,
    user: userid,
    picks: data,
    results: results,
    isEvaluated: isEvaluated,
  });
}

export function putPredictions(year, userid, data, results, isEvaluated) {
  return axios.put(`${API_ENDPOINT}/user-picks/${userid}`, {
    year,
    picks: data,
    results: results,
    isEvaluated: isEvaluated,
  });
}

export function getPredictions(userid) {
  return axios.get(`${API_ENDPOINT}/user-picks/${userid}`);
}
