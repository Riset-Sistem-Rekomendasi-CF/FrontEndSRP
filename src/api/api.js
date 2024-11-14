import axios from "axios";

const API_URL = "http://localhost:8000";

// GET API PPC
export const getPearsonPC = async (data) => {
  const response = await axios.post(`${API_URL}/api/v1/pearson`, data);
  return response.data;
};

// GET API COSINE
export const getCosine = async (data) => {
  const response = await axios.post(`${API_URL}/api/v1/cosine`, data);
  return response.data;
};

// GET API ACOSINE
export const getACosine = async (data) => {
  const response = await axios.post(`${API_URL}/api/v1/acosine`, data);
  return response.data;
};

// GET API BC
export const getBC = async (data) => {
  const response = await axios.post(`${API_URL}/api/v1/bc`, data);
  return response.data;
};
