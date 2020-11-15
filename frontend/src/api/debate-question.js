import axios from "axios";
import { API_ENDPOINT } from "../constants";

export function getAllDebateQuestions() {
  return axios.get(`${API_ENDPOINT}/debate-question/`);
}
