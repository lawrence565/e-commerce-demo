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

const baseURL = process.env.VITE_APP_BASE_URL ?? "http://localhost:8080";
const apiPath = process.env.VITE_APP_API_PATH ?? "api";

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
    return data.data[0];
  } catch (e) {
    let data: Product;
    const responce = products.find((product) => {
      product.id === id;
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
    const data = products.filter((product) => {
      product.category === category;
    });
    return data;
  }
};

export const getCategory = async (category: string): Promise<Product[]> => {
  let resData: Product[] = [];
  try {
    await axiosInstance
      .get<Product[]>(`getProduct/${category}`)
      .then((data) => {
        resData = data.data;
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    console.log("Here's something wrong " + e);
  }
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
