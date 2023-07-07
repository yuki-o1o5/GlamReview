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
    <StyledBox>
      <StyledAppBar position="static" elevation={0}>
        <StyledToolbar>
          <AppTitle variant="h6" component="div" onClick={handleHome}>
            GlamReview
          </AppTitle>
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
        </StyledToolbar>
      </StyledAppBar>
    </StyledBox>
  );
};

const StyledAppBar = styled(AppBar)`
  background-color: ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.custom.main};
`;

const StyledToolbar = styled(Toolbar)`
  padding: 0 20px;
  @media (min-width: 768px) {
    padding: 0 170px;
  }
`;

const StyledBox = styled(Box)`
  flex-grow: 1;
`;

const LoginName = styled.div`
  font-family: "Varela", sans-serif;
  margin-right: 20px;
  @media (min-width: 768px) {
    margin-right: 50px;
    font-size: 1.2rem;
  }
`;

const AppTitle = styled(Typography)`
  flex-grow: 1;
  font-family: "Kdam Thmor Pro", sans-serif;
`;
