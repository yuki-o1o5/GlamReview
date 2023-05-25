import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./page/HomePage";
import { Header } from "./components/Header";
import { ProductPage } from "./page/ProductPage";
import { LoginPage } from "./page/LoginPage";
import { SignupPage } from "./page/SignupPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
