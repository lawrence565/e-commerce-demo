/**
 * Google Analytics 電商事件追蹤函式庫
 * 提供標準化的 GA4 電商事件追蹤功能
 */

/**
 * GA4 電商商品項目介面
 */
export interface GAItem {
  item_name?: string;
  item_id?: string;
  price?: string | number;
  item_brand?: string;
  item_category?: string;
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_variant?: string;
  item_list_name?: string;
  item_list_id?: string;
  index?: number;
  quantity?: number;
}

/**
 * 結帳事件參數介面
 */
export interface PurchaseEventParams {
  transaction_id: string;
  affiliation?: string;
  value: string | number;
  tax?: string | number;
  shipping?: string | number;
  currency?: string;
  coupon?: string;
  items: GAItem[];
}

/**
 * 檢查 dataLayer 是否存在
 */
const checkDataLayer = (): boolean => {
  if (typeof window === "undefined" || !window.dataLayer) {
    console.warn("Google Tag Manager dataLayer is not available");
    return false;
  }
  return true;
};

/**
 * 加入購物車事件
 * @param items 商品項目陣列
 */
export const trackAddToCart = (items: GAItem[]): void => {
  if (!checkDataLayer()) return;

  window.dataLayer.push({
    event: "add_to_cart",
    eventModel: {
      items,
    },
  });

  console.log("GA Event: add_to_cart", items);
};

/**
 * 移除購物車事件
 * @param items 商品項目陣列
 */
export const trackRemoveFromCart = (items: GAItem[]): void => {
  if (!checkDataLayer()) return;

  window.dataLayer.push({
    event: "remove_from_cart",
    eventModel: {
      items,
    },
  });

  console.log("GA Event: remove_from_cart", items);
};

/**
 * 結帳事件
 * @param purchaseData 結帳資料
 */
export const trackPurchase = (purchaseData: PurchaseEventParams): void => {
  if (!checkDataLayer()) return;

  window.dataLayer.push({
    event: "purchase",
    eventModel: purchaseData,
  });

  console.log("GA Event: purchase", purchaseData);
};

/**
 * 查看商品事件
 * @param items 商品項目陣列
 */
export const trackViewItem = (items: GAItem[]): void => {
  if (!checkDataLayer()) return;

  window.dataLayer.push({
    event: "view_item",
    eventModel: {
      items,
    },
  });

  console.log("GA Event: view_item", items);
};

/**
 * 開始結帳流程事件
 * @param items 商品項目陣列
 */
export const trackBeginCheckout = (items: GAItem[]): void => {
  if (!checkDataLayer()) return;

  window.dataLayer.push({
    event: "begin_checkout",
    eventModel: {
      items,
    },
  });

  console.log("GA Event: begin_checkout", items);
};

/**
 * 查看購物車事件
 * @param items 商品項目陣列
 * @param value 購物車總價值
 */
export const trackViewCart = (items: GAItem[], value?: number): void => {
  if (!checkDataLayer()) return;

  window.dataLayer.push({
    event: "view_cart",
    eventModel: {
      items,
      ...(value && { value }),
    },
  });

  console.log("GA Event: view_cart", items);
};

/**
 * 自訂事件追蹤
 * @param eventName 事件名稱
 * @param eventParams 事件參數
 */
export const trackCustomEvent = (
  eventName: string,
  eventParams?: Record<string, any>
): void => {
  if (!checkDataLayer()) return;

  window.dataLayer.push({
    event: eventName,
    ...(eventParams && { eventModel: eventParams }),
  });

  console.log(`GA Event: ${eventName}`, eventParams);
};

// 擴展 Window 介面以支援 dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}
