export type CardInfo = {
    cardNumber: string;
    expiryMonth: number | string;
    expiryYear: number | string;
    securityCode: string;
};

export type ATMInfo = {
    bank: string;
    account: string;
    transferAccount: string;
};

export type CartItem = {
    productId: number;
    category: string;
    quantity: number;
};

export interface Product {
    id: number;
    title: string;
    name: string;
    category: string;
    price: number;
    description: string;
}

export type ShippmentInfo = {
    city: string;
    district: string;
    road: string;
    detail: string;
};

export type Recipient = {
    name: string;
    phone: string;
    email: string;
};

export type Order = {
    products: CartItem[];
    price: number;
    recipient: Recipient;
    shippment: ShippmentInfo;
    paymentInfo: CardInfo | ATMInfo;
    comment: string;
};
