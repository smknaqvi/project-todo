import axios from "axios";
import { API_ENDPOINT } from "../constants";

export function getProfileInfo(id) {
  return axios.get(`${API_ENDPOINT}/users/${id}`);
}
export function updateProfileRequest(id, data) {
  return axios.put(API_ENDPOINT + "/users/" + id, {
    bio: data.bio,
    username: data.username,
    password: data.password,
    birthday: data.birthday,
    favSport: data.favSport || "",
    oddSport: data.oddSport || "",
    favTeam: data.favTeam || "",
    levelOfPlay: data.levelOfPlay === "invalid" ? "" : data.levelOfPlay,
  });
}

export function uploadProfilePhotoRequest(userId, base64Image) {
  return axios.put(API_ENDPOINT + "/users/" + userId + "/profilePic", {
    origPosterID: userId,
    picture: base64Image,
  });
}
