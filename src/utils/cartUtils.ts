export const calculateDiscount = (subtotal: number): number => {
    if (subtotal > 5000) {
        return 500;
    }
    return 0;
};

export const calculateTotal = (
    subtotal: number,
    discount: number,
    couponDiscount: number
): number => {
    const total = subtotal - discount - couponDiscount;
    return total > 0 ? total : 0;
};
