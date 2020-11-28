import { client } from "./client";


export function postDailyPicks(userid, data) {
  return client.post(`/game-picks`, {
    user: userid,
    picks: data,
  });
}

export function putDailyPicks(userid, data) {
  return client.put(`/game-picks/${userid}`, {
    picks: data,
  });
}

export function getDailyPicks(userid) {
  return client.get(`/game-picks/${userid}`);
}
