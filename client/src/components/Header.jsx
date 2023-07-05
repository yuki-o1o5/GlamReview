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
        <StyledToolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: '"Kdam Thmor Pro", sans-serif' }}
            onClick={handleHome}
          >
            GlamReview
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
        </StyledToolbar>
      </StyledAppBar>
    </Box>
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

const LoginName = styled.div`
  font-family: "Varela", sans-serif;
  margin-right: 10px;
  @media (min-width: 768px) {
    margin-right: 50px;
    font-size: 1.2rem;
  }
`;
