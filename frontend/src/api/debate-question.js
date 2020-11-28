import { client } from "./client";



export function getAllDebateQuestions() {
  return client.get(`/debate-questions/`);
}

export function getDebateQuestionByTier(tier) {
  return client.get(`/debate-questions/get-by-tier/${tier}`);
}
