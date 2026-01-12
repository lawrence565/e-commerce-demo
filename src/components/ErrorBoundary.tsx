import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

/**
 * 全域錯誤邊界組件
 * 捕捉子組件中的 JavaScript 錯誤，避免整個應用程式崩潰
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error): Partial<State> {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({ errorInfo });

        // 可在此發送錯誤到追蹤服務
        console.error("ErrorBoundary caught an error:", error, errorInfo);

        // TODO: 整合錯誤追蹤服務 (如 Sentry)
        // if (import.meta.env.PROD) {
        //   Sentry.captureException(error, { extra: { errorInfo } });
        // }
    }

    handleRetry = (): void => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render(): ReactNode {
        if (this.state.hasError) {
            // 如果有自訂 fallback，使用它
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // 預設錯誤 UI
            return (
                <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center">
                    <div className="max-w-md">
                        <div className="text-6xl mb-4">😵</div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">
                            哎呀，出了點問題
                        </h1>
                        <p className="text-gray-600 mb-6">
                            很抱歉，頁面發生了錯誤。請嘗試重新載入或返回首頁。
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={this.handleRetry}
                                className="px-6 py-2 bg-midBrown text-white rounded-lg hover:bg-opacity-90 transition-colors"
                            >
                                重試
                            </button>
                            <button
                                onClick={() => (window.location.href = "/")}
                                className="px-6 py-2 border border-midBrown text-midBrown rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                返回首頁
                            </button>
                        </div>

                        {/* 開發模式顯示錯誤詳情 */}
                        {import.meta.env.DEV && this.state.error && (
                            <details className="mt-8 text-left bg-gray-100 p-4 rounded-lg text-sm">
                                <summary className="cursor-pointer text-gray-700 font-medium">
                                    錯誤詳情 (僅開發模式顯示)
                                </summary>
                                <pre className="mt-2 overflow-auto text-red-600 whitespace-pre-wrap">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

/**
 * 頁面級錯誤邊界
 * 提供較簡潔的錯誤提示
 */
export function PageErrorFallback({
    error,
    resetError,
}: {
    error?: Error;
    resetError?: () => void;
}) {
    return (
        <div className="p-8 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">載入失敗</h2>
            <p className="text-gray-600 mb-4">
                {error?.message || "頁面載入時發生錯誤"}
            </p>
            {resetError && (
                <button
                    onClick={resetError}
                    className="px-4 py-2 bg-midBrown text-white rounded-lg"
                >
                    重試
                </button>
            )}
        </div>
    );
}
