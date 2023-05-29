import { Button, InputBase, Paper, Typography } from "@mui/material";
import styled from "styled-components";
import { useContext, useState } from "react";
import {
  LOGIN_ERROR,
  LOGIN_SUCCESSFUL,
  emailRegex,
  errEmail,
  errPassword,
  passwordRegex,
} from "../constants/regex";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../App";

export const LoginPage = () => {
  const [message, setMessage] = useState("");
  const { dispatch } = useContext(UserContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLoginWithEmail = async (data) => {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });
    if (response.ok) {
      const user = await response.json();
      if (!user) {
        setMessage(LOGIN_ERROR);
      } else {
        dispatch({ type: "LOGIN", payload: user.userName });
        setMessage(LOGIN_SUCCESSFUL);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } else {
      const errorData = await response.json();
      setMessage(errorData.message);
    }
  };

  return (
    <PageContainer>
      <FormContainer onSubmit={handleSubmit(handleLoginWithEmail)}>
        <Typography gutterBottom variant="h6" component="div">
          Login
        </Typography>
        <LinkContainer>
          <LinkTitle>New to Cosme Review? </LinkTitle>
          <Link to="/signup">Signup</Link>
        </LinkContainer>
        <InputAndErrorContainer>
          <Paper
            component="div"
            sx={{
              p: "7px",
            }}
          >
            <StyledInputBase
              placeholder="email"
              fullWidth
              {...register("email", {
                required: true,
                pattern: emailRegex,
              })}
            />
          </Paper>
          {errors.email && <ErrorText>{errEmail}</ErrorText>}
        </InputAndErrorContainer>
        <Paper
          component="div"
          sx={{
            p: "7px",
          }}
        >
          <StyledInputBase
            placeholder="password"
            type="password"
            fullWidth
            {...register("password", {
              required: true,
              pattern: passwordRegex,
            })}
          />
        </Paper>
        {errors.password && <ErrorText>{errPassword}</ErrorText>}
        <ButtonContainer>
          <Button variant="outlined" type="submit">
            login
          </Button>
        </ButtonContainer>
        {message && <LoginMessage>{message}</LoginMessage>}
      </FormContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Varela", sans-serif;
`;

const FormContainer = styled.form`
  width: 20%;
  display: flex;
  flex-direction: column;
  border: 0.5px solid #808896;
  margin-top: 100px;
  padding: 40px 60px;
`;

const LinkTitle = styled.div`
  margin-right: 10px;
`;

const LinkContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const InputAndErrorContainer = styled.div`
  margin-bottom: 10px;
`;

const StyledInputBase = styled(InputBase)`
  font-size: 13px;
`;

const ErrorText = styled.span`
  font-size: 0.9rem;
  color: #8f2220;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const LoginMessage = styled.div`
  color: #7e7c0a;
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-item: center;
`;
