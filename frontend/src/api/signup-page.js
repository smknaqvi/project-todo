import axios from "axios";
import { API_ENDPOINT } from "../constants";

export function signupRequest(data) {
  return axios.post(API_ENDPOINT + "/users", {
    username: data.username,
    password: data.password,
    age: data.age || -1,
    favSport: data.favSport || "",
    oddSport: data.oddSport || "",
    favTeam: data.favTeam || "",
    levelOfPlay: data.levelOfPlay === "invalid" ? "" : data.levelOfPlay,
  });
}
