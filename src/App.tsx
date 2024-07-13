import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout.tsx";
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
            <Route index element={<Store />} />
            <Route path="about" element={<About />} />
            <Route path="store" element={<Store />} />
            <Route path="personal" element={<Personal />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
