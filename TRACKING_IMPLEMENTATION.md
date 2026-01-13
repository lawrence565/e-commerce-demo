# GA 追蹤事件實作總結

## 📊 已實作的追蹤事件

本文件記錄了在電商系統中實作的所有 Google Analytics 追蹤事件。

---

## 🛍️ 1. 商品頁面 (Product.tsx)

### 檔案路徑

`src/pages/Product.tsx`

### 實作的追蹤事件

#### 1.1 查看商品事件 (View Item)

- **觸發時機**: 當用戶進入商品詳情頁面時
- **追蹤函式**: `trackViewItem()`
- **追蹤資料**:
  - 商品名稱 (item_name)
  - 商品 ID (item_id)
  - 商品價格 (price)
  - 商品分類 (item_category)
  - 數量 (quantity: 1)

```typescript
trackViewItem([
  {
    item_name: data.title,
    item_id: data.id.toString(),
    price: data.price,
    item_category: data.category,
    quantity: 1,
  },
]);
```

#### 1.2 加入購物車事件 (Add to Cart)

- **觸發時機**: 當用戶點擊「加入購物車」按鈕時
- **追蹤函式**: `trackAddToCart()`
- **追蹤資料**:
  - 商品名稱 (item_name)
  - 商品 ID (item_id)
  - 商品價格 (price)
  - 商品分類 (item_category)
  - 用戶選擇的數量 (quantity)

```typescript
trackAddToCart([
  {
    item_name: product.title,
    item_id: product.id.toString(),
    price: product.price,
    item_category: product.category,
    quantity: amount,
  },
]);
```

#### 1.3 開始結帳事件 (Begin Checkout)

- **觸發時機**: 當用戶點擊「立即購買」按鈕時
- **追蹤函式**: `trackBeginCheckout()`
- **追蹤資料**:
  - 商品名稱 (item_name)
  - 商品 ID (item_id)
  - 商品價格 (price)
  - 商品分類 (item_category)
  - 用戶選擇的數量 (quantity)

```typescript
trackBeginCheckout([
  {
    item_name: product.title,
    item_id: product.id.toString(),
    price: product.price,
    item_category: product.category,
    quantity: amount,
  },
]);
```

---

## 🛒 2. 購物車頁面 (ShoppingCart.tsx)

### 檔案路徑

`src/pages/ShoppingCart.tsx`

### 實作的追蹤事件

#### 2.1 查看購物車事件 (View Cart)

- **觸發時機**: 當購物車頁面載入並成功取得商品資料時
- **追蹤函式**: `trackViewCart()`
- **追蹤資料**:
  - 所有購物車商品的陣列
  - 購物車總價值 (cartValue)
  - 每個商品包含：商品名稱、ID、價格、分類、數量

```typescript
trackViewCart(validItems, cartValue);
```

#### 2.2 移除購物車事件 (Remove from Cart)

- **觸發時機**: 當用戶點擊刪除按鈕移除商品時
- **追蹤函式**: `trackRemoveFromCart()`
- **追蹤資料**:
  - 被移除商品的名稱 (item_name)
  - 商品 ID (item_id)
  - 商品價格 (price)
  - 商品分類 (item_category)
  - 被移除的數量 (quantity)

```typescript
trackRemoveFromCart([
  {
    item_name: product.title,
    item_id: product.id.toString(),
    price: product.price,
    item_category: product.category,
    quantity: amount,
  },
]);
```

#### 2.3 開始結帳事件 (Begin Checkout)

- **觸發時機**: 當用戶點擊「結帳」按鈕時
- **追蹤函式**: `trackBeginCheckout()`
- **追蹤資料**:
  - 所有購物車商品的陣列
  - 每個商品包含：商品名稱、ID、價格、分類、數量

```typescript
trackBeginCheckout(validItems);
```

---

## ✅ 3. 訂單完成頁面 (FinishOrder.tsx)

### 檔案路徑

`src/pages/FinishOrder.tsx`

### 實作的追蹤事件

#### 3.1 購買完成事件 (Purchase)

- **觸發時機**: 當訂單完成頁面載入時（用戶成功完成購買）
- **追蹤函式**: `trackPurchase()`
- **追蹤資料**:
  - 交易 ID (transaction_id) - 自動生成的唯一訂單編號
  - 商店名稱 (affiliation): "線上商店"
  - 訂單總金額 (value)
  - 貨幣 (currency): "TWD"
  - 所有購買商品的陣列 (items)

```typescript
trackPurchase({
  transaction_id: transactionId,
  affiliation: "線上商店",
  value: cookie.order.price,
  currency: "TWD",
  items: validItems,
});
```

---

## 📋 追蹤事件總覽

| 編號 | 頁面             | 事件名稱   | GA4 事件類型       | 觸發時機           |
| ---- | ---------------- | ---------- | ------------------ | ------------------ |
| 1    | Product.tsx      | 查看商品   | `view_item`        | 進入商品頁面       |
| 2    | Product.tsx      | 加入購物車 | `add_to_cart`      | 點擊「加入購物車」 |
| 3    | Product.tsx      | 開始結帳   | `begin_checkout`   | 點擊「立即購買」   |
| 4    | ShoppingCart.tsx | 查看購物車 | `view_cart`        | 購物車頁面載入     |
| 5    | ShoppingCart.tsx | 移除購物車 | `remove_from_cart` | 點擊刪除商品       |
| 6    | ShoppingCart.tsx | 開始結帳   | `begin_checkout`   | 點擊「結帳」按鈕   |
| 7    | FinishOrder.tsx  | 購買完成   | `purchase`         | 訂單完成頁面載入   |

---

## 🔧 技術細節

### 使用的函式庫

- **檔案位置**: `src/utils/gaEventTracking.ts`
- **主要函式**:
  - `trackViewItem()` - 追蹤查看商品
  - `trackAddToCart()` - 追蹤加入購物車
  - `trackRemoveFromCart()` - 追蹤移除購物車
  - `trackBeginCheckout()` - 追蹤開始結帳
  - `trackViewCart()` - 追蹤查看購物車
  - `trackPurchase()` - 追蹤購買完成

### 資料格式

所有追蹤事件都遵循 GA4 Enhanced Ecommerce 標準格式，包含：

- `item_name`: 商品名稱
- `item_id`: 商品 ID（字串格式）
- `price`: 商品價格（數字）
- `item_category`: 商品分類
- `quantity`: 數量

### 錯誤處理

- 所有追蹤函式都包含錯誤處理機制
- 如果 GTM 未載入，會在 console 顯示警告訊息
- 不會影響用戶的正常購物流程

---

## 🎯 電商漏斗分析

這些追蹤事件可以幫助分析完整的電商轉換漏斗：

```
查看商品 (view_item)
    ↓
加入購物車 (add_to_cart)
    ↓
查看購物車 (view_cart)
    ↓
開始結帳 (begin_checkout)
    ↓
購買完成 (purchase)
```

---

## ⚠️ 注意事項

1. **GTM 載入**: 確保 Google Tag Manager 已正確載入在頁面上
2. **資料格式**: 所有價格都以數字格式傳送
3. **商品 ID**: 商品 ID 轉換為字串格式以符合 GA4 規範
4. **異步處理**: 購物車相關追蹤使用 async/await 確保資料完整性
5. **唯一交易 ID**: 每筆訂單都會生成唯一的交易 ID

---

## 📈 後續可擴展功能

未來可以考慮加入的追蹤事件：

- [ ] 搜尋事件 (search)
- [ ] 商品列表查看 (view_item_list)
- [ ] 促銷活動查看 (view_promotion)
- [ ] 選擇商品 (select_item)
- [ ] 加入願望清單 (add_to_wishlist)
- [ ] 分享商品 (share)

---

## 🔗 相關文件

- [gaEventTracking.ts 函式庫說明](src/utils/README.md)
- [Google Analytics 4 Enhanced Ecommerce 文件](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)

---

**最後更新日期**: 2026-01-05
