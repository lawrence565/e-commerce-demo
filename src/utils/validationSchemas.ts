import { z } from "zod";

/**
 * 收件人資訊驗證
 */
export const recipientSchema = z.object({
    name: z
        .string()
        .min(2, "姓名至少需要 2 個字")
        .max(50, "姓名不能超過 50 個字"),
    phone: z
        .string()
        .regex(/^09\d{8}$/, "請輸入有效的手機號碼 (09xxxxxxxx)"),
    email: z.string().email("請輸入有效的電子郵件地址"),
});

/**
 * 配送地址驗證
 */
export const shippmentSchema = z.object({
    city: z.string().min(1, "請選擇縣市"),
    district: z.string().min(1, "請選擇區域"),
    road: z.string().min(1, "請選擇路名"),
    detail: z
        .string()
        .min(1, "請輸入詳細地址")
        .max(100, "地址不能超過 100 個字"),
});

/**
 * 信用卡資訊驗證
 */
export const cardInfoSchema = z.object({
    cardNumber: z
        .string()
        .regex(/^\d{4}-\d{4}-\d{4}-\d{4}$/, "請輸入有效的信用卡號碼"),
    expiryMonth: z
        .union([z.string(), z.number()])
        .transform((val) => Number(val))
        .refine((val) => val >= 1 && val <= 12, "請輸入有效的月份 (1-12)"),
    expiryYear: z
        .union([z.string(), z.number()])
        .transform((val) => Number(val))
        .refine((val) => val >= 24 && val <= 40, "請輸入有效的年份"),
    securityCode: z.string().regex(/^\d{3,4}$/, "請輸入 3-4 位數的安全碼"),
});

/**
 * ATM 轉帳資訊驗證
 */
export const atmInfoSchema = z.object({
    bank: z.string().min(1, "請選擇銀行"),
    account: z.string().min(10, "帳號至少需要 10 位數").max(16, "帳號不能超過 16 位數"),
    transferAccount: z.string().optional(),
});

/**
 * 結帳表單驗證 (完整)
 */
export const checkoutSchema = z.object({
    recipient: recipientSchema,
    shippment: shippmentSchema,
    paymentInfo: z.union([cardInfoSchema, atmInfoSchema]),
    comment: z.string().max(500, "備註不能超過 500 個字").optional(),
});

/**
 * 登入表單驗證
 */
export const loginSchema = z.object({
    email: z.string().email("請輸入有效的電子郵件地址"),
    password: z
        .string()
        .min(8, "密碼至少需要 8 個字元")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "密碼須包含大小寫字母及數字"
        ),
});

/**
 * 註冊表單驗證
 */
export const registerSchema = z
    .object({
        name: z.string().min(2, "姓名至少需要 2 個字"),
        email: z.string().email("請輸入有效的電子郵件地址"),
        password: z
            .string()
            .min(8, "密碼至少需要 8 個字元")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                "密碼須包含大小寫字母及數字"
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "兩次輸入的密碼不一致",
        path: ["confirmPassword"],
    });

/**
 * 使用者個人資料驗證
 */
export const userProfileSchema = z.object({
    name: z.string().min(2, "姓名至少需要 2 個字"),
    birthday: z.string().regex(/^\d{4}\/\d{2}\/\d{2}$/, "請輸入有效的日期格式 (YYYY/MM/DD)"),
    email: z.string().email("請輸入有效的電子郵件地址"),
    phone: z.string().regex(/^09\d{8}$/, "請輸入有效的手機號碼"),
    addresses: z.array(shippmentSchema),
});

// 型別匯出
export type RecipientInput = z.infer<typeof recipientSchema>;
export type ShippmentInput = z.infer<typeof shippmentSchema>;
export type CardInfoInput = z.infer<typeof cardInfoSchema>;
export type ATMInfoInput = z.infer<typeof atmInfoSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type UserProfileInput = z.infer<typeof userProfileSchema>;
