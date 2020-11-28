import { client } from "./client";



export function getCompletedQuestionsRequest(id) {
  return client.get(`/trivia/${id}`);
}

export function getQuestions() {
  return client.get(`/trivia/questions`);
}

export function updateCompletedQuestions(id, questionsCompleted) {
  return client.put(`/trivia/${id}`, {
    triviaQuestionsCompleted: questionsCompleted,
  });
}
