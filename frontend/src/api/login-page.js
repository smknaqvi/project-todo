import { client } from "./client";


export function loginRequest(data) {
  return client.post( "/auth/login", {
    username: data.username,
    password: data.password,
  });
}
