import { client } from "./client";
import { Product } from "../types";

export type MerchantStats = {
    totalSales: number;
    totalOrders: number;
    recentOrders: {
        id: number;
        customer: string;
        total: number;
        status: string;
    }[];
};

const mockStats: MerchantStats = {
    totalSales: 150000,
    totalOrders: 45,
    recentOrders: [
        { id: 101, customer: "王小明", total: 1500, status: "Pending" },
        { id: 102, customer: "李小華", total: 3200, status: "Shipped" },
        { id: 103, customer: "陳大文", total: 800, status: "Delivered" },
    ],
};

export const getMerchantStats = async (): Promise<MerchantStats> => {
    try {
        const response = await client.get("merchant/stats");
        return response.data.data;
    } catch (e) {
        console.warn("Failed to fetch merchant stats, using mock data");
        return mockStats;
    }
};

export const getMerchantProducts = async (): Promise<Product[]> => {
    try {
        const response = await client.get("merchant/products");
        return response.data.data;
    } catch (e) {
        console.warn("Failed to fetch merchant products, using mock data");
        return [];
    }
};

export const createProduct = async (product: Omit<Product, "id">) => {
    return await client.post("merchant/products", product);
};

export const updateProduct = async (id: number, product: Partial<Product>) => {
    return await client.put(`merchant/products/${id}`, product);
};

export const deleteProduct = async (id: number) => {
    return await client.delete(`merchant/products/${id}`);
};
