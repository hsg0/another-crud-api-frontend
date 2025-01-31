import axios from "axios";

const API_URL = `${ip}/api/products`;

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getProduct = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
