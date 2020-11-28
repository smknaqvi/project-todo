import { client } from "./client";



export function postPredictions(year, userid, data, results, isEvaluated) {
  return client.post(`/user-picks`, {
    year,
    user: userid,
    picks: data,
    results: results,
    isEvaluated: isEvaluated,
  });
}

export function putPredictions(year, userid, data, results, isEvaluated) {
  return client.put(`/user-picks/${userid}`, {
    year,
    picks: data,
    results: results,
    isEvaluated: isEvaluated,
  });
}

export function getPredictions(userid) {
  return client.get(`/user-picks/${userid}`);
}
