import { Button, InputBase, Paper, Typography } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ERROR_EMAIL,
  ERROR_PASSWORD,
  ERROR_REGISTER,
  ERROR_USER_NAME,
  SUCCESSFUL_REGISTER,
} from "../constants/message";
import { emailRegex, passwordRegex } from "../utils/regexUtils";

export const SignupPage = () => {
  const [authMessage, setAuthMessage] = useState({
    isError: false,
    message: "",
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = async (data) => {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: data.userName,
        email: data.email,
        password: data.password,
      }),
    });

    if (response.ok) {
      setAuthMessage({ isError: false, message: SUCCESSFUL_REGISTER });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      return true;
    } else {
      setAuthMessage({ isError: true, message: ERROR_REGISTER });
      return false;
    }
  };
  return (
    <PageContainer>
      <FormContainer onSubmit={handleSubmit(handleSignup)}>
        <Typography gutterBottom variant="h6" component="div">
          Signup
        </Typography>
        <LinkContainer>
          <LinkTitle>Already have an account? </LinkTitle>
          <Link to="/login">Go to Login</Link>
        </LinkContainer>
        <InputAndErrorContainer>
          <StyledPaper>
            <StyledInputBase
              placeholder="Name"
              type="text"
              fullWidth
              {...register("userName", {
                required: true,
              })}
              autoComplete="off"
            />
          </StyledPaper>
          {errors.userName && <ErrorText>{ERROR_USER_NAME}</ErrorText>}
        </InputAndErrorContainer>
        <InputAndErrorContainer>
          <StyledPaper>
            <StyledInputBase
              placeholder="email"
              type="email"
              fullWidth
              {...register("email", {
                required: true,
                pattern: emailRegex,
              })}
              autoComplete="email"
            />
          </StyledPaper>
          {errors.email && <ErrorText>{ERROR_EMAIL}</ErrorText>}
        </InputAndErrorContainer>
        <InputAndErrorContainer>
          <StyledPaper>
            <StyledInputBase
              placeholder="password"
              type="password"
              fullWidth
              {...register("password", {
                required: true,
                pattern: passwordRegex,
              })}
              autoComplete="off"
            />
          </StyledPaper>
          {errors.password && <ErrorText>{ERROR_PASSWORD}</ErrorText>}
        </InputAndErrorContainer>
        <ButtonContainer>
          <Button variant="outlined" type="submit">
            register
          </Button>
        </ButtonContainer>
        {authMessage && (
          <SignupMessage isError={authMessage.isError}>
            {authMessage.message}
          </SignupMessage>
        )}
      </FormContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Varela", sans-serif;
`;

const FormContainer = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  border: 0.5px solid #808896;
  margin-top: 100px;
  padding: 30px 40px;
  @media (min-width: 768px) {
    width: 25%;
    padding: 40px 60px;
  }
`;

const StyledPaper = styled(Paper)`
  padding: 6px;
`;

const LinkTitle = styled.div`
  margin-right: 10px;
`;

const LinkContainer = styled.div`
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

const SignupMessage = styled.div`
  color: ${({ isError }) => (isError ? "#8f2220" : "#7e7c0a")};
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-item: center;
`;
