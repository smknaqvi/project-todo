import { client } from "./client";



export function signupRequest(data) {
  return client.post("/users", {
    username: data.username,
    password: data.password,
    birthday: data.birthday,
    favSport: data.favSport || "",
    oddSport: data.oddSport || "",
    favTeam: data.favTeam || "",
    levelOfPlay: data.levelOfPlay === "invalid" ? "" : data.levelOfPlay,
  });
}
