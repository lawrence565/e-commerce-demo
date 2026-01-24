import { client } from "./client";
import products from "../assets/products.json";
import { Product, CartItem, Order } from "../types";

interface Responce {
  status: string;
  data: Product[];
}

// get product
export const getSingleProduct = async (category: string, id: number) => {
  try {
    const data: Responce = await client
      .get<Responce>(`getProduct/${category}/${id}`)
      .then((responce) => {
        return responce.data;
      });

    return data.data[0];
  } catch {
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
    const data: Responce = await client
      .get<Responce>(`getProduct/${category}`)
      .then((data) => {
        return data.data;
      });
    return data.data;
  } catch {
    const data: Product[] = products.filter((product) => {
      return product.category === category;
    });
    return data;
  }
};

// Cart
export const getCart = async () => {
  const responce = await client.get(`cart`);
  return responce.data.data;
};

export const postCart = async (cartitem: CartItem) => {
  return await client.post(`cart`, cartitem);
};

export const deleteCartItem = async (id: number) => {
  return await client.delete(`cart/${id}`);
};

export const deleteCartAll = async () => {
  return await client.delete("carts");
};

export const editCartItem = async (id: number, newQty: number) => {
  return await client.put(
    `cart/${id}`,
    {
      data: {
        id: id,
        newQty: newQty,
      },
    }
  );
};

export const syncCart = async (cart: CartItem[]) => {
  try {
    const responce = await client.put("cart", cart);
    return responce.data.data;
  } catch (e) {
    console.log(e);
  } finally {
    console.log("Finish syncing");
  }
};

// Order
export const getOrder = async (id: number) => {
  return await client.get(`/order/${id}`);
};

export const postOrder = async (order: Order) => {
  const responce = await client.post(`/order`, order);
  return responce.data.data;
};
