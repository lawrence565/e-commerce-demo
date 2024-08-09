import axios from "axios";

type CartItem = {
  id: number;
  quantity: number;
};

const baseURL = process.env.VITE_APP_BASE_URL;
const apiPath = process.env.VITE_APP_API_PATH;

const axiosInstance = axios.create({
  baseURL: `${baseURL}/${apiPath}/`,
});

// get product
export const getProduct = async (category: string, product: string) => {
  axiosInstance.get(`getProduct/${category}/${product}`);
};

export const getCategory = async (category: string) => {
  axiosInstance.get(`getProduct/${category}`);
};

export const getAllProduct = async () => {
  axiosInstance.get(`getProduct/all`);
};

// Cart
export const getCart = async () => {
  return await axiosInstance.get(`cart`);
};

export const postCart = async (data: CartItem[]) => {
  return await axiosInstance.post(`cart`, data);
};

export const deleteCartItem = async (id: number) => {
  return await axiosInstance.delete(`cart/${id}`);
};

export const deleteCartAll = async () => {
  return await axiosInstance.delete("carts");
};

export const editCartItem = async (item, newQty) => {
  return await axiosInstance.put(`cart/${item.id}`, {
    data: {
      product_id: item.product_id,
      qty: newQty,
    },
  });
};
