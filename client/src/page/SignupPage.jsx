import { Button, InputBase, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { REGISTER_ERROR, REGISTER_SUCCESSFUL } from "../constants/regex";

export const SignupPage = () => {
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, email, password }),
    });

    if (response.ok) {
      setMessage(REGISTER_SUCCESSFUL);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      return true;
    } else {
      setMessage(REGISTER_ERROR);
      return false;
    }

    // handle response here
  };
  return (
    <>
      <div>SignupPage</div>
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
            placeholder="Name"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
          register
        </Button>
        <div>{message}</div>
      </form>
    </>
  );
};
