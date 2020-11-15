import axios from "axios";
import { API_ENDPOINT } from "../constants";

export function postDebate(
  tier,
  question,
  responses,
  date,
  isEvaluated,
  winner
) {
  return axios.post(`${API_ENDPOINT}/debate`, {
    tier,
    question,
    responses,
    date,
    isEvaluated,
    winner,
  });
}

export function putDebate(
  id,
  tier,
  question,
  responses,
  date,
  isEvaluated,
  winner
) {
  return axios.put(`${API_ENDPOINT}/debate/${id}`, {
    tier,
    question,
    responses,
    date,
    isEvaluated,
    winner,
  });
}

export function getDebate(id) {
  return axios.get(`${API_ENDPOINT}/debate/${id}`);
}

export function getDebateByUserId(id) {
  return axios.get(`${API_ENDPOINT}/debate/get-by-userid/${id}`);
}

export function getAllDebates() {
  return axios.get(`${API_ENDPOINT}/debate`);
}
