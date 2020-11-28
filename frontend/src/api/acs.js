import { client } from "./client";


export function acsRequest(id) {
  return client.get(`/acs/${id}`);
}

export function putUpdatedAcs(id, type, updatedACS) {
  return client.put(`/acs/${id}`, { updatedACS, type });
}
