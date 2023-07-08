import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./page/HomePage";
import { Header } from "./components/Header";
import { ProductPage } from "./page/ProductPage";
import { LoginPage } from "./page/LoginPage";
import { SignupPage } from "./page/SignupPage";
import { ThemeProvider } from "@mui/material";
import { theme } from "./constants/colorTheme";
import { useReducer } from "react";
import { userInitialState, userReducer } from "./reducers/userReducer";
import { UserContext } from "./contexts/UserContext";

function App() {
  const [state, dispatch] = useReducer(userReducer, userInitialState);

  return (
    <>
      <ThemeProvider theme={theme}>
        <UserContext.Provider
          value={{ user: state.user, useId: state.userId, dispatch }}
        >
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
