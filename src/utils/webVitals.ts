import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from "web-vitals";

type ReportHandler = (metric: Metric) => void;

/**
 * Web Vitals 效能監控
 * 
 * 指標說明：
 * - CLS (Cumulative Layout Shift): 累積版面配置位移
 * - INP (Interaction to Next Paint): 互動到下次繪製
 * - FCP (First Contentful Paint): 首次內容繪製
 * - LCP (Largest Contentful Paint): 最大內容繪製
 * - TTFB (Time to First Byte): 首位元組時間
 */

// 預設報告處理器 - 輸出到 console
const defaultReportHandler: ReportHandler = (metric) => {
    // 開發環境才輸出
    if (import.meta.env.DEV) {
        console.log(`[Web Vital] ${metric.name}:`, {
            value: metric.value,
            rating: metric.rating,
            delta: metric.delta,
            id: metric.id,
        });
    }
};

// 發送到分析服務的報告處理器
const analyticsReportHandler: ReportHandler = (metric) => {
    // 在生產環境發送到分析服務
    if (import.meta.env.PROD) {
        // 範例：發送到 Google Analytics
        // gtag('event', metric.name, {
        //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        //   event_label: metric.id,
        //   non_interaction: true,
        // });

        // 或發送到自訂 API
        const body = JSON.stringify({
            name: metric.name,
            value: metric.value,
            rating: metric.rating,
            delta: metric.delta,
            id: metric.id,
            navigationType: metric.navigationType,
        });

        // 使用 sendBeacon 確保頁面關閉時也能發送
        if (navigator.sendBeacon) {
            navigator.sendBeacon("/api/analytics/vitals", body);
        }
    }
};

/**
 * 初始化 Web Vitals 監控
 * @param onReport - 自訂報告處理器
 */
export function initWebVitals(onReport?: ReportHandler) {
    const handler = onReport || defaultReportHandler;

    onCLS(handler);
    onINP(handler);
    onFCP(handler);
    onLCP(handler);
    onTTFB(handler);
}

/**
 * 取得效能等級評估
 */
export function getPerformanceRating(metric: Metric): "good" | "needs-improvement" | "poor" {
    return metric.rating;
}

/**
 * 效能指標閾值 (毫秒)
 */
export const WEB_VITALS_THRESHOLDS = {
    LCP: {
        good: 2500,
        poor: 4000,
    },
    INP: {
        good: 200,
        poor: 500,
    },
    CLS: {
        good: 0.1,
        poor: 0.25,
    },
    FCP: {
        good: 1800,
        poor: 3000,
    },
    TTFB: {
        good: 800,
        poor: 1800,
    },
} as const;

export { analyticsReportHandler };
