# 文創市集電商網站

Demo 網址：https://lawrence565.github.io/e-commerce-demo/

![e-commerce-demo](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F596f6b2d-210d-48f7-81d5-35f35637581e%2F05dc48bd-33d9-4e09-96c7-2e6917ad50fb%2FFooter.png?table=block&id=3a131c31-7337-453c-b3d1-31c038fdacf8&spaceId=596f6b2d-210d-48f7-81d5-35f35637581e&width=2000&userId=3a3881eb-2001-47bc-83d4-953775e76061&cache=v2)

## 專案簡介

這是一個關於文創市集的電商網站。在大學期間曾參與了許多市集，與商家們聊天的過程中了解到他們都有著獨特的背景及理念，靠著一輛滿懷理想的麵包車在全台巡迴、推廣理想。

由於巡迴的緣故，這些商家們只能夠過社群宣傳即將參與的市集，而沒有一個完整的通路與消費者們溝通、互動。因此本專案會提供一個線上解決方案，著重在商品介紹、理念宣傳、貼文推廣等方向，同時提供消費者購買商品的管道使得商家們不會限制於市集的巡迴，能夠有更多的銷售機會。

## 功能介紹

### 面向消費者

本網站會呈現總共有四大功能，分別為「商品陳列」、「商家貼文」、「市集資訊」與「個人收藏」。消費者可以透過網站進行商品的閱覽及購買、查看商家最近的貼文以及分享的內容，同時也能分享自己購買產品的心得，而市集相關的資訊也可以透過此網站查詢。最後則是個人收藏，可以收藏喜歡的商品同時追蹤喜歡的商家。

### 面向商家

本網站能提供商家「產品上架」、「貼文宣傳」、「市集資訊」等相關功能。商家能夠在此網站上架產品，解決商家物流、金流上的痛點，增加銷售管道。而貼文宣傳的部分提供商家可以與消費者溝通的管道，增加互動的機會並宣傳商家的理念。

## 使用技術

本專案著重於前端部分的規劃，主要使用 React 框架搭配 TypeScript 搭建，同時利用 Vite 打包專案。後端則使用 PostgreSQL 搭配 Node.js 完成簡易伺服器。

- React
- Vite
- TypeScript
- Node.js
- PostgreSQL

## 專案安裝

```JavaScript
$ git clone https://github.com/lawrence565/e-commerce-demo.git
$ cd e-commerce-demo
$ npm install
$ npm start
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
