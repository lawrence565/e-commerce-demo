import axios, { AxiosResponse } from "axios";

type CartItem = {
  id: number;
  quantity: number;
};

interface Product {
  title: string;
  name: string;
  price: number;
  img: string;
}

const baseURL = "http://localhost:8080";
const apiPath = "/api";

const axiosInstance = axios.create({
  baseURL: `${baseURL}/${apiPath}/`,
});

// get product
export const getProduct = async (category: string, product: string) => {
  const data: Product[] = await axiosInstance
    .get<Product[]>(`getProduct/${category}/${product}`)
    .then((data) => {
      return data.data;
    });
  return data;
};

export const getCategory = async (category: string): Promise<Product[]> => {
  let resData: Product[] = [];
  await axiosInstance
    .get<Product[]>(`getProduct/${category}`)
    .then((data) => {
      resData = data.data;
    })
    .catch((e) => {
      console.log(e);
    });
  return resData;
};

export const getAllProduct = async () => {
  await axiosInstance
    .get<Product[]>(`getProduct/all`)
    .then((data) => {
      return data.data;
    })
    .catch((e) => {
      console.log(e);
    });
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

// export const editCartItem = async (item, newQty) => {
//   return await axiosInstance.put(`cart/${item.id}`, {
//     data: {
//       product_id: item.product_id,
//       qty: newQty,
//     },
//   });
// };
