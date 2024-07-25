import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout.tsx";
import Homepage from "./Homepage.tsx";
import Store from "./Store.tsx";
import About from "./About.tsx";
import Personal from "./Personal.tsx";
import "./style/App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="store" element={<Store />} />
            <Route path="about" element={<About />} />
            <Route path="personal" element={<Personal />} />
          </Route>
          <Route path="/products" element={<Layout />}>
            <Route index element={<Store />} />
            <Route path="gadgets" element={<Store />} />
            <Route path="furnitures" element={<About />} />
            <Route path="decorations" element={<Personal />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
