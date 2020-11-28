import { client } from "./client";



export function getOCPosts() {
  return client.get( "/posts", {});
}

export function getUserByID(ids) {
  return client.get( "/users/" + ids, {});
}

export function deleteOCPost(id) {
  return client.delete( "/posts/" + id, {});
}

export function deleteOCComment(pid, cid) {
  return client.delete( "/posts/" + pid + "/comments/" + cid, {});
}

export function uploadOCComment(pid, uid, comment) {
  return client.post( "/posts/" + pid + "/comments/", {
    origPosterID: uid,
    content: comment,
  });
}
