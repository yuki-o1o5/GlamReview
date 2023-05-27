import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./page/HomePage";
import { Header } from "./components/Header";
import { ProductPage } from "./page/ProductPage";
import { LoginPage } from "./page/LoginPage";
import { SignupPage } from "./page/SignupPage";
import { createContext, useReducer } from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "./constants/colorTheme";

export const UserContext = createContext();

const initialState = {
  user: null,
};

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ user: state.user, dispatch }}>
          <div>
            <Header />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/:id" element={<ProductPage />} />
            </Routes>
          </div>
        </UserContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
