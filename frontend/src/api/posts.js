import axios from "axios";
import { API_ENDPOINT } from "../constants";

export function uploadPost({ userId, content, base64Image }) {
  return axios.post(API_ENDPOINT + "/posts", {
    origPosterID: userId,
    content: content,
    picture: base64Image,
  });
}
