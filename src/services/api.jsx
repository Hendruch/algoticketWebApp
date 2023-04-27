import axios from "axios";
import { API_URL } from "../config";

export const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Requested-With": "XMLHttpRequest",
  "Access-Control-Allow-Origin": "*",
};
export const headersWithToken = {
  "Access-Control-Allow-Credentials": true,
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Requested-With": "XMLHttpRequest",
  "Access-Control-Allow-Origin": "*",
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers,
});

export default axiosInstance;
