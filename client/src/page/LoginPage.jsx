import { Button, InputBase, Paper } from "@mui/material";
import { useContext, useState } from "react";
import { LOGIN_ERROR, LOGIN_SUCCESSFUL } from "../constants/regex";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { dispatch } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const user = await response.json();
      // console.log(user, "userclient");
      if (!user) {
        setMessage(LOGIN_ERROR);
      } else {
        dispatch({ type: "LOGIN", payload: user.userName });
        setMessage(LOGIN_SUCCESSFUL);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    }
  };

  return (
    <>
      <div>LoginPage</div>
      <form onSubmit={handleSubmit}>
        <Paper
          component="div"
          sx={{
            p: "5px 4px",
            display: "flex",
            alignItems: "center",
            width: 300,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Paper>
        <Paper
          component="div"
          sx={{
            p: "5px 4px",
            display: "flex",
            alignItems: "center",
            width: 300,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Paper>
        <Button variant="outlined" type="submit">
          login
        </Button>
        <div>{message}</div>
      </form>
    </>
  );
};
