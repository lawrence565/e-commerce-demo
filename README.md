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
$ npm start
```

## 使用套件

- Runtime Environment: Node.js @16.4
- Front-end Library: React @18.3.1
- UI Framework: Tailwind @3.4.6

## License

Licensed under the MIT License, Copyright © 2024-present Lawrence Wu
