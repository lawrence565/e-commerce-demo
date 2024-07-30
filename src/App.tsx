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
            <Route path="stores" element={<Store type="index" />}>
              <Route path="gadgets" element={<Store type="gadgets" />} />
              <Route path="furnitures" element={<Store type="furnitures" />} />
              <Route
                path="decorations"
                element={<Store type="decorations" />}
              />
            </Route>
            <Route path="about" element={<About />} />
            <Route path="personal" element={<Personal />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
