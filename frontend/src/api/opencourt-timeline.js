import axios from "axios";
import { API_ENDPOINT } from "../constants";

export function getOCPosts() {
  return axios.get(API_ENDPOINT + "/posts", {});
}

export function getUserByID(ids) {
  return axios.get(API_ENDPOINT + "/users/" + ids, {});
}

export function deleteOCPost(id) {
  return axios.delete(API_ENDPOINT + "/posts/" + id, {});
}

export function deleteOCComment(pid, cid) {
  return axios.delete(API_ENDPOINT + "/posts/" + pid + "/comments/" + cid, {});
}

export function uploadOCComment(pid, uid, comment) {
  return axios.post(API_ENDPOINT + "/posts/" + pid + "/comments/", {
    origPosterID: uid,
    content: comment,
  });
}
