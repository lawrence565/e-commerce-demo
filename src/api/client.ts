import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// 使用環境變數，並提供開發環境預設值
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const apiPath = "api";

export const client = axios.create({
    baseURL: `${baseURL}/${apiPath}/`,
    withCredentials: true,
    timeout: 10000, // 10 秒超時
});

// Request Interceptor
client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 從 cookie 讀取 CSRF token (如果後端有實作)
        const csrfToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("XSRF-TOKEN="))
            ?.split("=")[1];

        if (csrfToken && config.headers) {
            config.headers["X-XSRF-TOKEN"] = csrfToken;
        }

        // 可在此加入 auth token
        // const authToken = localStorage.getItem('authToken');
        // if (authToken && config.headers) {
        //   config.headers['Authorization'] = `Bearer ${authToken}`;
        // }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
client.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
            _retryCount?: number;
        };

        // 重試邏輯 (最多重試 2 次)
        const maxRetries = 2;
        if (
            error.code === "ECONNABORTED" ||
            error.code === "ERR_NETWORK" ||
            (error.response?.status && error.response.status >= 500)
        ) {
            originalRequest._retryCount = originalRequest._retryCount || 0;

            if (originalRequest._retryCount < maxRetries) {
                originalRequest._retryCount += 1;
                // 指數退避
                await new Promise((resolve) =>
                    setTimeout(resolve, 1000 * originalRequest._retryCount!)
                );
                return client(originalRequest);
            }
        }

        // 統一錯誤處理
        if (error.response) {
            const status = error.response.status;

            switch (status) {
                case 401:
                    // 未授權 - 可導向登入頁
                    console.warn("Unauthorized - redirecting to login");
                    // window.location.href = '/#/login';
                    break;
                case 403:
                    console.warn("Forbidden - access denied");
                    break;
                case 404:
                    console.warn("Resource not found");
                    break;
                case 500:
                    console.error("Server error");
                    break;
                default:
                    console.error(`API Error: ${status}`);
            }
        } else if (error.request) {
            console.error("Network error - no response received");
        }

        return Promise.reject(error);
    }
);

// 匯出通用的 API 錯誤類型
export interface ApiError {
    message: string;
    status?: number;
    code?: string;
}

export const parseApiError = (error: unknown): ApiError => {
    if (axios.isAxiosError(error)) {
        return {
            message: error.response?.data?.message || error.message || "Unknown error",
            status: error.response?.status,
            code: error.code,
        };
    }
    return {
        message: error instanceof Error ? error.message : "Unknown error",
    };
};
