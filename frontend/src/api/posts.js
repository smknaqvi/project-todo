import { client } from "./client";



export function uploadPost({ userId, content, base64Image }) {
  return client.post( "/posts", {
    origPosterID: userId,
    content: content,
    picture: base64Image,
  });
}
