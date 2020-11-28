import { client } from "./client";



export function gamesRequest() {
  return client.get(`/games/`);
}


