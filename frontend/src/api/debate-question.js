import axios from "axios";
import { API_ENDPOINT } from "../constants";

export function getAllDebateQuestions() {
  return axios.get(`${API_ENDPOINT}/debate-questions/`);
}

export function getDebateQuestionByTier(tier) {
  return axios.get(`${API_ENDPOINT}/debate-questions/get-by-tier/${tier}`);
}
