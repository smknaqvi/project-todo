import axios from "axios";
import { API_ENDPOINT } from "../constants";

export function acsRequest(id) {
  return axios.get(`${API_ENDPOINT}/acs/${id}`);
}

export function putUpdatedAcs(id, type, updatedACS) {
  return axios.put(`${API_ENDPOINT}/acs/${id}`, { updatedACS, type });
}
