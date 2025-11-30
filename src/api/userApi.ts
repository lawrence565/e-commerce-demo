import { client } from "./client";
import { Order, Recipient, ShippmentInfo } from "../types";

export type UserProfile = {
    name: string;
    birthday: string;
    email: string;
    phone: string;
    addresses: ShippmentInfo[];
};

// Mock data for fallback
const mockProfile: UserProfile = {
    name: "王小明",
    birthday: "1980/10/10",
    email: "higoogle@google.com",
    phone: "0912345678",
    addresses: [
        {
            city: "台北市",
            district: "中正區",
            road: "重慶南路一段",
            detail: "122號",
        },
    ],
};

const mockOrders: Order[] = [
    {
        products: [
            { productId: 2, category: "gadget", quantity: 1 },
            { productId: 27, category: "furniture", quantity: 1 },
        ],
        price: 1500,
        recipient: { name: "王小明", phone: "0912345678", email: "higoogle@google.com" },
        shippment: {
            city: "台北市",
            district: "中正區",
            road: "重慶南路一段",
            detail: "122號",
        },
        paymentInfo: {
            cardNumber: "****-****-****-1234",
            expiryMonth: 12,
            expiryYear: 25,
            securityCode: "***",
        },
        comment: "",
    },
];

export const getUserProfile = async (): Promise<UserProfile> => {
    try {
        const response = await client.get("user/profile");
        return response.data.data;
    } catch (e) {
        console.warn("Failed to fetch user profile, using mock data");
        return mockProfile;
    }
};

export const updateUserProfile = async (profile: UserProfile) => {
    return await client.put("user/profile", profile);
};

export const getUserOrders = async (): Promise<Order[]> => {
    try {
        const response = await client.get("user/orders");
        return response.data.data;
    } catch (e) {
        console.warn("Failed to fetch user orders, using mock data");
        return mockOrders;
    }
};
