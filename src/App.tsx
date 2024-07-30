import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout.tsx";
import Homepage from "./pages/Homepage.tsx";
import Store from "./pages/Store.tsx";
import Product from "./pages/Product.tsx";
import About from "./pages/About.tsx";
import Personal from "./pages/Personal.tsx";
import "./style/App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="stores" element={<Store />}>
              <Route path=":catagory" element={<Store />} />
            </Route>
            <Route path="stores/:category/:productName" element={<Product />} />
            <Route path="about" element={<About />} />
            <Route path="personal" element={<Personal />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
