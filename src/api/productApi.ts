import axios from "axios";
import products from "../assets/products.json";

type CardInfo = {
  cardNumber: string;
  expiryMonth: number | string;
  expiryYear: number | string;
  securityCode: string;
};

type ATMInfo = {
  bank: string;
  account: string;
  transferAccount: string;
};

type CartItem = {
  productId: number;
  category: string;
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

type ShippmentInfo = {
  city: string;
  district: string;
  road: string;
  detail: string;
};

type Recipient = {
  name: string;
  phone: string;
  email: string;
};

type Order = {
  products: CartItem[];
  recipient: Recipient;
  shippment: ShippmentInfo;
  paymentInfo: CardInfo | ATMInfo;
  comment: string;
};

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
  const responce = await axiosInstance.get(`cart`, { withCredentials: true });
  return responce.data.data;
};

export const postCart = async (cartitem: CartItem) => {
  return await axiosInstance.post(`cart`, cartitem, { withCredentials: true });
};

export const deleteCartItem = async (id: number) => {
  return await axiosInstance.delete(`cart/${id}`, { withCredentials: true });
};

export const deleteCartAll = async () => {
  return await axiosInstance.delete("carts", { withCredentials: true });
};

export const editCartItem = async (id: number, newQty: number) => {
  return await axiosInstance.put(
    `cart/${id}`,
    {
      data: {
        id: id,
        newQty: newQty,
      },
    },
    { withCredentials: true }
  );
};

export const syncCart = async (cart: CartItem[]) => {
  try {
    const responce = await axiosInstance.put("cart", cart, {
      withCredentials: true,
    });
    return responce.data.data;
  } catch (e) {
    console.log("e");
  } finally {
    console.log("Finish syncing");
  }
};

// Order
export const getOrder = async (id: number) => {
  return await axiosInstance.get(`/order/${id}`, { withCredentials: true });
};

export const postOrder = async (order: Order) => {
  const responce = await axiosInstance.post(`/order`, order, {
    withCredentials: true,
  });
  console.log(responce.data);
  return responce.data.data;
};
