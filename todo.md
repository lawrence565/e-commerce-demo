## Codebase audit / 改善計劃

- 路由與全域狀態：`App.tsx`/`Navbar.tsx` 直接在 render 階段呼叫 `setCookie`，缺少初始化判斷導致重複 render；Cart/Spinner Context 沒有明確型別匯出與重用。
- 商品展示：`Store` 以 Tailwind 動態 class 設定高度無效，`displayHeight` 產生 `pxpx` 字串；`StoreDisplay` 的分頁數計算不正確、缺少空資料處理。
- 購物車：`ShoppingCart` 內 `defaultCartItem` 與實際資料無關導致小計陣列長度錯誤；優惠碼輸入框未綁定 `onChange` 無法手動輸入；cookie/cart 同步缺少安全防呆與 loading 管理。
- 商品頁：Spinner 僅在圖片載入時關閉，失敗時卡死；重複宣告 `Product`/`CartItem` 型別。
- 互動/動畫：Carousel 類元件多處直接操作 DOM，缺乏最小寬度防護，Transition state 控制冗餘；Mobile 手勢與按鈕未封裝復用。

### 待執行（本輪目標）
- [x] 將 cart cookie 初始化移到 `useEffect` 並封裝 helper，共用於 `App`/`Navbar`，避免 render 階段 setState。
- [x] 修正 `Store`/`StoreDisplay`：移除動態 Tailwind 高度、改用 style；分頁使用 `Math.ceil` 並處理空清單，確保頁碼控制正常。
- [x] 強化購物車：依實際項目建立小計陣列，補上優惠碼輸入控制與錯誤提示，避免預設值造成計算錯；同步 cookie 時加上防呆及 Spinner 收合。
- [x] 商品頁：重用共用型別、補上 spinner 錯誤/完成時隱藏與 fallback 圖片 alt。
- [x] Carousel/ReviewCarousel：加上寬度防護與滑動鎖定，避免過渡過度抖動，統一過場時間。
