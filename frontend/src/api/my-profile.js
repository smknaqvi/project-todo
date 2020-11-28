import { client } from "./client";



export function getProfileInfo(id) {
  return client.get(`/users/${id}`);
}

export function getProfileInfoForIds(ids) {
  return client.get(`/users/get-profiles/`, {params : {userids : ids}});
}
export function updateProfileRequest(id, data) {
  return client.put( "/users/" + id, {
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
  return client.put( "/users/" + userId + "/profilePic", {
    origPosterID: userId,
    picture: base64Image,
  });
}
