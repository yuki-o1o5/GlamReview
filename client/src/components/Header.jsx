import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import styled from "styled-components";
import { UserContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { user, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };
  const handlelogin = () => {
    navigate("/login");
  };
  const handlelogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={handleHome}
          >
            Cosme Review
          </Typography>
          <LoginName>{user ? user : "Guest"}</LoginName>
          {user ? (
            <Button
              color="secondary"
              variant="contained"
              onClick={handlelogout}
            >
              Logout
            </Button>
          ) : (
            <Button color="secondary" variant="contained" onClick={handlelogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const LoginName = styled.div`
  margin-right: 50px;
  color: ${(props) => props.theme.palette.custom.light};
`;
