# 文創市集電商網站

Demo 網址：https://lawrence565.github.io/e-commerce-demo/

![e-commerce-demo](/public/Cover.png)

## 專案簡介

這是一個關於文創市集的電商網站。在大學期間曾參與了許多市集，與商家們聊天的過程中了解到他們都有著獨特的背景及理念，靠著一輛滿懷理想的麵包車在全台巡迴、推廣理想。

由於巡迴的緣故，這些商家們只能夠過社群宣傳即將參與的市集，而沒有一個完整的通路與消費者們溝通、互動。因此本專案會提供一個線上解決方案，著重在商品介紹、理念宣傳、貼文推廣等方向，同時提供消費者購買商品的管道使得商家們不會限制於市集的巡迴，能夠有更多的銷售機會。

## 功能介紹

### 面向消費者

本網站會呈現總共有四大功能，分別為「**商品陳列**」、「**商家貼文**」、「**市集資訊**」與「**個人收藏**」。消費者可以透過網站進行商品的閱覽及購買、查看商家最近的貼文以及分享的內容，同時也能分享自己購買產品的心得，而市集相關的資訊也可以透過此網站查詢。最後則是個人收藏，可以收藏喜歡的商品同時追蹤喜歡的商家。

### 面向商家

本網站能提供商家「**產品上架**」、「**貼文宣傳**」、「**市集資訊**」等相關功能。商家能夠在此網站上架產品，解決商家<u>物流</u>、<u>金流</u>上的痛點，增加銷售管道。而貼文宣傳的部分提供商家可以與消費者溝通的管道，增加互動的機會並宣傳商家的理念。

## 使用技術

本專案著重於前端部分的規劃，主要使用 React 框架搭配 TypeScript 搭建，同時利用 Vite 打包專案。[後端](https://github.com/lawrence565/e-commerce-backend)則使用 PostgreSQL 搭配 Node.js 完成簡易伺服器。

- React
- Vite
- TypeScript
- Node.js
- PostgreSQL

## 未來增加功能

在完成最簡易的 MVP 後，未來會期望透過增加其他功能與相關的前端動畫，提高作品完成度並增進用戶體驗。後續相關規劃如下：

- 製作 **商家** 相關功能：目前以消費者相關功能為主，因此在網站的功能及規劃上較少觸及「商家」的部分。後續會更多的著重相關功能，提供商家也可以使用的完整產品。
- 金流串接服務：後續會希望能夠串接如藍新、綠界等相關**金流服務**，提高產品的可用性、方便性及用戶的信任感。使產品能夠真正的上線使用。
- 安全性提升：目前只著重於功能實現與相關設計，並沒有處理<u>前端資安</u>相關議題，因此後續希望透過補足相關領域知識後提高產品安全性。

## 專案安裝

```
$ git clone https://github.com/lawrence565/e-commerce-demo.git
$ cd e-commerce-demo
$ npm install
$ npm run dev
```

## 靜態部署與本機 API

- `npm run dev`：預設連接本機 API（`VITE_API_BASE_URL`，預設 `http://localhost:8080`）。
- `npm run build`：預設使用 `src/assets/products.json`，不發出後端 API 請求。GitHub Pages workflow 也明確指定 `VITE_DATA_MODE=static`。
- `VITE_DATA_MODE=static npm run dev`：在本機預覽靜態展示模式。
- `VITE_DATA_MODE=api npm run build`：需要測試 local server 的 production build 時使用。

靜態模式的商品瀏覽不必等待 API 失敗。其他需要後端的操作會立即回傳不可用錯誤，沿用頁面既有的 cookie／展示資料 fallback；不會建立真實訂單。

模擬 GitHub Pages 子路徑：

```sh
VITE_BASE_URL=/e-commerce-demo/ npm run build
VITE_BASE_URL=/e-commerce-demo/ npm run preview
```

## 靜態圖片最佳化

`npm run dev` 和 `npm run build` 前會自動執行 `npm run images:generate`，使用 Sharp 從原始圖片產生 320、640、960、1280 px WebP（不放大超過原圖尺寸）與內嵌的 24 px 佔位圖。

- 原始圖片：`public/gadgets`、`public/furnitures`、`public/decorations`、`public/Stores`，以及 `src/assets` 的四張首頁輪播 PNG。
- 產物：`public/generated-images/` 與 `src/generated/images.json`，由建置重建、不提交 Git。
- 圖片 URL 含內容雜湊，更新原圖後會產生新 URL，避免 PWA 沿用舊圖片。
- `LazyImage` 自動套用本地圖片的 `srcSet`、佔位圖及 fallback；呼叫端用 `sizes` 描述顯示寬度。未知圖片或外部 URL 維持原始來源。
- 首頁第一張與商品詳情主圖優先載入；其餘圖片 lazy loading。列表與商品詳情不等待圖片才解除全頁 Loading。

更新圖片後重新執行 `npm run images:generate`（或重啟 dev server）。只在 URL 加上 `?w=...` 不會讓 GitHub Pages 縮圖。

驗證：`npm run test:unit`、`npm run lint`、`npm run build`。

## 使用套件

- Runtime Environment: Node.js @16.4
- Front-end Library: React @18.3.1
- UI Framework: Tailwind @3.4.6

## License

Licensed under the MIT License, Copyright © 2024-present Lawrence Wu
