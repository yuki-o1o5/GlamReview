import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import styled from "styled-components";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

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
      <StyledAppBar position="static" elevation={0}>
        <Toolbar style={{ padding: "0 170px" }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontFamily: '"Kdam Thmor Pro", sans-serif' }}
            onClick={handleHome}
          >
            SPARKLESCOOP
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
      </StyledAppBar>
    </Box>
  );
};

const StyledAppBar = styled(AppBar)`
  background-color: ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.custom.main};
`;

const LoginName = styled.div`
  font-family: "Varela", sans-serif;
  margin-right: 50px;
  font-size: 1.2rem;
`;
