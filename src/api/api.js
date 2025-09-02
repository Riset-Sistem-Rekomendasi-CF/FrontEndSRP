import axios from "axios";

// publik
// const API_URL = "http://93.188.163.245:8000";
const API_URL = "https://api.koalaers.trunojoyoan.com"

// lokal
// const API_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  }
});

// GET API PPC
export const getPearsonPC = async (data) => {
  const response = await axiosInstance.post(`${API_URL}/api/v2/pearson`, data);
  return response.data;
};

// GET API COSINE
export const getCosine = async (data) => {
  const response = await axiosInstance.post(`${API_URL}/api/v2/cosine`, data);
  return response.data;
};

// GET API ACOSINE
export const getACosine = async (data) => {
  const response = await axiosInstance.post(`${API_URL}/api/v2/acosine`, data);
  return response.data;
};

// GET API BC
export const getBC = async (data) => {
  const response = await axiosInstance.post(`${API_URL}/api/v2/bc`, data);
  return response.data;
};
