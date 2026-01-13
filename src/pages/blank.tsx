import { useEffect } from "react";
import { trackPurchase } from "../utils/gaEventTracking";

function Blank() {
  useEffect(() => {
    trackPurchase({
      transaction_id: "ORDER12345",
      affiliation: "線上商店",
      value: 300,
      currency: "TWD",
      items: [],
    });

    window.location.href = "www.google.com";
  }, []);

  return <div>測試頁面</div>;
}

export default Blank;
