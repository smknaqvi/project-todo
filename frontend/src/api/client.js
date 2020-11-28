import axios from "axios";
import { API_ENDPOINT } from "../constants";
import axiosRetry from 'axios-retry';
export const client = axios.create({ baseURL: `${API_ENDPOINT}` });
axiosRetry(client, { retries: 2 });
