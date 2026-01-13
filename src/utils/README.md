# 電商追蹤與客戶管理函式庫

這個資料夾包含了可重複使用的電商追蹤與客戶管理功能模組。

## 📁 檔案說明

### 1. `gaEventTracking.ts` - Google Analytics 事件追蹤

提供標準化的 GA4 電商事件追蹤功能。

#### 主要功能：

- ✅ `trackAddToCart()` - 追蹤加入購物車事件
- ✅ `trackRemoveFromCart()` - 追蹤移除購物車事件
- ✅ `trackPurchase()` - 追蹤結帳事件
- ✅ `trackViewItem()` - 追蹤查看商品事件
- ✅ `trackBeginCheckout()` - 追蹤開始結帳事件
- ✅ `trackViewCart()` - 追蹤查看購物車事件
- ✅ `trackCustomEvent()` - 追蹤自訂事件

### 2. `ecCustomerManager.ts` - EC 客戶管理

提供電商客戶登入、登出及狀態管理功能。

#### 主要功能：

- ✅ `ecLogin()` - 客戶登入
- ✅ `ecLogout()` - 客戶登出
- ✅ `checkEcCustomerStatus()` - 檢查客戶狀態
- ✅ `getCurrentCustomerId()` - 取得目前客戶 ID
- ✅ `isCustomerLoggedIn()` - 檢查是否已登入

---

## 📖 使用範例

### 範例 1: 在 React 元件中追蹤加入購物車

```tsx
import { trackAddToCart } from "@/utils/gaEventTracking";
import type { GAItem } from "@/utils/gaEventTracking";

function ProductCard({ product }) {
  const handleAddToCart = () => {
    // 準備商品資料
    const item: GAItem = {
      item_name: product.name,
      item_id: product.id,
      price: product.price,
      item_brand: product.brand,
      item_category: product.category,
      quantity: 1,
    };

    // 追蹤事件
    trackAddToCart([item]);

    // 執行實際的購物車邏輯
    addToCart(product);
  };

  return <button onClick={handleAddToCart}>加入購物車</button>;
}
```

### 範例 2: 追蹤結帳事件

```tsx
import { trackPurchase } from "@/utils/gaEventTracking";
import type { PurchaseEventParams } from "@/utils/gaEventTracking";

function CheckoutSuccess({ order }) {
  useEffect(() => {
    const purchaseData: PurchaseEventParams = {
      transaction_id: order.id,
      affiliation: "Online Store",
      value: order.total,
      tax: order.tax,
      shipping: order.shipping,
      currency: "TWD",
      coupon: order.couponCode,
      items: order.items.map((item) => ({
        item_name: item.name,
        item_id: item.id,
        price: item.price,
        item_brand: item.brand,
        item_category: item.category,
        quantity: item.quantity,
      })),
    };

    trackPurchase(purchaseData);
  }, [order]);

  return <div>訂單完成！</div>;
}
```

### 範例 3: EC 客戶登入

```tsx
import { ecLogin } from "@/utils/ecCustomerManager";
import type { CustomerProfile } from "@/utils/ecCustomerManager";

function LoginButton() {
  const handleLogin = async () => {
    const customerId = "customer_12345";
    const profile: CustomerProfile = {
      name: "張三",
      email: "zhangsan@example.com",
      mobilePhone: "0912345678",
      membershipTierName: "VIP",
    };

    const success = ecLogin(customerId, profile);

    if (success) {
      console.log("登入成功");
    }
  };

  return <button onClick={handleLogin}>登入</button>;
}
```

### 範例 4: 檢查登入狀態

```tsx
import {
  isCustomerLoggedIn,
  getCurrentCustomerId,
} from "@/utils/ecCustomerManager";

function UserProfile() {
  const isLoggedIn = isCustomerLoggedIn();
  const customerId = getCurrentCustomerId();

  if (!isLoggedIn) {
    return <div>請先登入</div>;
  }

  return <div>歡迎回來！客戶 ID: {customerId}</div>;
}
```

### 範例 5: 購物車頁面完整範例

```tsx
import {
  trackViewCart,
  trackRemoveFromCart,
  trackBeginCheckout,
} from "@/utils/gaEventTracking";

function ShoppingCart({ cartItems }) {
  useEffect(() => {
    // 頁面載入時追蹤查看購物車
    const items = cartItems.map((item) => ({
      item_name: item.name,
      item_id: item.id,
      price: item.price,
      quantity: item.quantity,
    }));

    const totalValue = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    trackViewCart(items, totalValue);
  }, [cartItems]);

  const handleRemoveItem = (item) => {
    trackRemoveFromCart([
      {
        item_name: item.name,
        item_id: item.id,
        price: item.price,
        quantity: item.quantity,
      },
    ]);

    removeFromCart(item.id);
  };

  const handleCheckout = () => {
    const items = cartItems.map((item) => ({
      item_name: item.name,
      item_id: item.id,
      price: item.price,
      quantity: item.quantity,
    }));

    trackBeginCheckout(items);
    navigateToCheckout();
  };

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => handleRemoveItem(item)}>移除</button>
        </div>
      ))}
      <button onClick={handleCheckout}>前往結帳</button>
    </div>
  );
}
```

### 範例 6: 商品頁面範例

```tsx
import { trackViewItem } from "@/utils/gaEventTracking";

function ProductPage({ product }) {
  useEffect(() => {
    // 頁面載入時追蹤查看商品
    trackViewItem([
      {
        item_name: product.name,
        item_id: product.id,
        price: product.price,
        item_brand: product.brand,
        item_category: product.category,
        item_variant: product.color,
      },
    ]);
  }, [product]);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>價格: ${product.price}</p>
    </div>
  );
}
```

---

## 🔧 TypeScript 類型支援

所有函式庫都提供完整的 TypeScript 類型定義：

- `GAItem` - GA 商品項目介面
- `PurchaseEventParams` - 結帳事件參數介面
- `CustomerProfile` - 客戶資料介面

---

## ⚠️ 注意事項

1. **確保 GTM 已載入**：所有功能都依賴 Google Tag Manager，請確保在使用這些函式前 GTM 已正確載入。

2. **錯誤處理**：函式內建錯誤處理和 console 警告，便於開發時除錯。

3. **SSR 相容**：函式會檢查 `window` 物件是否存在，可安全用於 SSR 環境。

4. **資料驗證**：建議在呼叫函式前驗證資料的完整性。

---

## 🚀 進階使用

### 自訂事件追蹤

```tsx
import { trackCustomEvent } from "@/utils/gaEventTracking";

// 追蹤使用者行為
trackCustomEvent("user_scroll_depth", {
  depth_percentage: 75,
  page_path: window.location.pathname,
});

// 追蹤搜尋
trackCustomEvent("search", {
  search_term: searchQuery,
  results_count: searchResults.length,
});
```

### 結合客戶管理與事件追蹤

```tsx
import { ecLogin } from "@/utils/ecCustomerManager";
import { trackCustomEvent } from "@/utils/gaEventTracking";

const handleUserLogin = (userId: string, profile: CustomerProfile) => {
  // 執行 EC 登入
  const success = ecLogin(userId, profile);

  if (success) {
    // 追蹤登入事件
    trackCustomEvent("user_login", {
      user_id: userId,
      login_method: "email",
    });
  }
};
```

---

## 📝 更新日誌

- **2026-01-05**: 初始版本，包含基礎 GA 事件追蹤和 EC 客戶管理功能
