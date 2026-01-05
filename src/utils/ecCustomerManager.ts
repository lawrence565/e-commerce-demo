/**
 * EC 客戶管理函式庫
 * 提供電商客戶登入、登出及狀態檢查功能
 */

/**
 * 客戶資料介面
 */
export interface CustomerProfile {
  name?: string;
  mobilePhone?: string;
  email?: string;
  birthday?: string;
  gender?: string;
  membershipTierName?: string;
  [key: string]: any; // 允許額外的自訂欄位
}

/**
 * 檢查 EC 相關函數是否存在
 */
const checkECFunctions = (): boolean => {
  if (typeof window === "undefined") {
    console.warn("Window object is not available (SSR environment)");
    return false;
  }
  return true;
};

/**
 * EC 客戶登入
 * @param customerId 客戶 ID
 * @param profile 客戶資料
 * @param additionalProfile 額外的客戶資料
 * @returns 是否成功執行
 */
export const ecLogin = (
  customerId: string,
  profile?: CustomerProfile,
  additionalProfile?: Record<string, any>
): boolean => {
  if (!checkECFunctions()) return false;

  if (!window.ecLogin) {
    console.warn(
      "ecLogin function is not available. Please ensure GTM is properly loaded."
    );
    return false;
  }

  if (!customerId || customerId.trim() === "") {
    console.error("Customer ID is required for EC login");
    return false;
  }

  const customerProfile: CustomerProfile = {
    name: profile?.name || customerId,
    mobilePhone: profile?.mobilePhone || "",
    email: profile?.email || "",
    birthday: profile?.birthday || "",
    gender: profile?.gender || "",
    membershipTierName: profile?.membershipTierName || "",
    ...(additionalProfile || {}),
  };

  try {
    window.ecLogin(customerId, customerProfile);
    console.log("EC Login successful:", customerId);
    return true;
  } catch (error) {
    console.error("EC Login failed:", error);
    return false;
  }
};

/**
 * EC 客戶登出
 * @returns 是否成功執行
 */
export const ecLogout = (): boolean => {
  if (!checkECFunctions()) return false;

  if (!window.ecLogout) {
    console.warn(
      "ecLogout function is not available. Please ensure GTM is properly loaded."
    );
    return false;
  }

  try {
    window.ecLogout();
    console.log("EC Logout successful");
    return true;
  } catch (error) {
    console.error("EC Logout failed:", error);
    return false;
  }
};

/**
 * 檢查 EC 客戶狀態
 * @returns 是否成功執行
 */
export const checkEcCustomerStatus = (): boolean => {
  if (!checkECFunctions()) return false;

  if (!window.checkEcCustStatus) {
    console.warn(
      "checkEcCustStatus function is not available. Please ensure GTM is properly loaded."
    );
    return false;
  }

  try {
    window.checkEcCustStatus();
    console.log("EC Customer status check executed");
    return true;
  } catch (error) {
    console.error("EC Customer status check failed:", error);
    return false;
  }
};

/**
 * 取得當前 EC 客戶 ID (如果可用)
 * 這個函數假設 GTM 可能會在 window 物件中儲存客戶資訊
 * @returns 客戶 ID 或 null
 */
export const getCurrentCustomerId = (): string | null => {
  if (!checkECFunctions()) return null;

  // 這裡可以根據實際的 GTM 實作來取得客戶 ID
  // 以下是一些常見的可能位置
  if (window.ecCustomerId) {
    return window.ecCustomerId;
  }

  // 也可以從 dataLayer 中尋找
  if (window.dataLayer) {
    const customerData = window.dataLayer.find(
      (item: any) => item.ecCustomerId
    );
    if (customerData?.ecCustomerId) {
      return customerData.ecCustomerId;
    }
  }

  return null;
};

/**
 * 檢查客戶是否已登入
 * @returns 是否已登入
 */
export const isCustomerLoggedIn = (): boolean => {
  return getCurrentCustomerId() !== null;
};

// 擴展 Window 介面以支援 EC 相關函數
declare global {
  interface Window {
    ecLogin?: (customerId: string, profile: CustomerProfile) => void;
    ecLogout?: () => void;
    checkEcCustStatus?: () => void;
    ecCustomerId?: string;
    selfBuildProfile?: Record<string, any>;
    dataLayer: any[];
  }
}
