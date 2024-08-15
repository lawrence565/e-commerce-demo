import axios from "axios";
import products from "../assets/products.json";

type CartItem = {
  id: number;
  quantity: number;
};

interface Product {
  id: number;
  title: string;
  name: string;
  category: string;
  price: number;
  discription: string;
}

interface Responce {
  status: string;
  data: Product[];
}

const baseURL = "http://localhost:8080";
const apiPath = "api";

const axiosInstance = axios.create({
  baseURL: `${baseURL}/${apiPath}/`,
});

// get product
export const getSingleProduct = async (category: string, id: number) => {
  try {
    const data: Responce = await axiosInstance
      .get<Responce>(`getProduct/${category}/${id}`)
      .then((responce) => {
        return responce.data;
      });
    console.log(data);

    return data.data[0];
  } catch (e) {
    let data: Product;
    const responce = products.find((product) => {
      return product.id === id;
    });
    if (responce) {
      data = responce;
      return data;
    }
  }
};

export const getProducts = async (category: string) => {
  try {
    const data: Responce = await axiosInstance
      .get<Responce>(`getProduct/${category}`)
      .then((data) => {
        return data.data;
      });
    return data.data;
  } catch (e) {
    const data: Product[] = products.filter((product) => {
      return product.category === category;
    });
    return data;
  }
};

// Cart
export const getCart = async () => {
  return await axiosInstance.get(`cart`);
};

export const postCart = async (data: CartItem) => {
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
