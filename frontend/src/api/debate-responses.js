import axios from "axios";
import { API_ENDPOINT } from "../constants";
import { Map } from "immutable";

export function postDebateResponses(user, content, date) {
  return axios.post(`${API_ENDPOINT}/debate-responses`, {
    user: user,
    content: content,
    count: 0,
    rating: new Map(),
    date,
  });
}

export function getDebateResponseById(userid) {
  return axios.get(`${API_ENDPOINT}/debate-responses/${userid}`);
}

export function getDebateResponses() {
  return axios.get(`${API_ENDPOINT}/debate-responses`);
}
