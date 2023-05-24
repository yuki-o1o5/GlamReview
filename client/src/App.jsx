import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./page/HomePage";
import { Header } from "./components/Header";
import { ProductPage } from "./page/ProductPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
