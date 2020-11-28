import { client } from "./client";


export function playerRequest() {
  return client.get(`/team`);
}

