import { client } from "./client";


export function getWinners(year) {
  return client.get(`/winners/${year}`);
}
