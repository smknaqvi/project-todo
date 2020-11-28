import { Map } from "immutable";
import { client } from "./client";


export function postDebateResponses(user, content, date) {
  return client.post(`/debate-responses`, {
    user: user,
    content: content,
    count: 0,
    rating: new Map(),
    date,
  });
}

export function getDebateResponseById(userid) {
  return client.get(`/debate-responses/${userid}`);
}

export function getDebateResponses() {
  return client.get(`/debate-responses`);
}
