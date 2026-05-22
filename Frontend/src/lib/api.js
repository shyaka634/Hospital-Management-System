import axios from 'axios';

const API_BASE_URL ='http://localhost:4000';

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
});

export function getErrorMessage(err) {
  const msg =
    err?.response?.data?.message ||
    err?.response?.data ||
    err?.message ||
    'Something went wrong';
  return typeof msg === 'string' ? msg : JSON.stringify(msg);
}

