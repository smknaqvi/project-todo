import axios from "axios";
import { API_ENDPOINT } from "../constants";

export function postDebate(debate) {
  return axios.post(`${API_ENDPOINT}/debate`, {
    tier: debate.tier,
    question: debate.question,
    debaterIds: debate.debaterIds,
    responseIds: debate.responseIds,
    date: debate.date,
  });
}

export function putDebate(debate) {
  if (debate._id === undefined || debate._id === null) {
    return postDebate(debate);
  } else {
    return axios.put(`${API_ENDPOINT}/debate/${debate._id}`, {
      tier: debate.tier,
      question: debate.question,
      debaterIds: debate.debaterIds,
      responseIds: debate.responseIds,
      date: debate.date,
      isEvaluated: debate.isEvaluated,
    });
  }
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

export function getDebateByTier(tier) {
  return axios.get(`${API_ENDPOINT}/debate/get-by-tier/${tier}`);
}
