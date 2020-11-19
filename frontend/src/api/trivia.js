import axios from "axios";
import { API_ENDPOINT } from "../constants";

export function getCompletedQuestionsRequest(id) {
  return axios.get(`${API_ENDPOINT}/trivia/${id}`);
}

export function getQuestions() {
  return axios.get(`${API_ENDPOINT}/trivia/questions`);
}

export function updateCompletedQuestions(id, questionsCompleted) {
  return axios.put(`${API_ENDPOINT}/trivia/${id}`, {
    triviaQuestionsCompleted: questionsCompleted,
  });
}
