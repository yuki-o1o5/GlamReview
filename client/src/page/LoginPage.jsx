import { Typography } from "@mui/material";
import styled from "styled-components";
import { useContext, useState } from "react";
import {
  ERROR_EMAIL,
  ERROR_LOGIN,
  ERROR_PASSWORD,
  SUCCESSFUL_LOGIN,
} from "../constants/message";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../contexts/UserContext";
import { emailRegex, passwordRegex } from "../utils/regexUtils";
import { UserInput } from "../components/userInput";
import ContainedButton from "../components/ContainedButton";

export const LoginPage = () => {
  const [authMessage, setAuthMessage] = useState({
    isError: false,
    message: "",
  });
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
        setAuthMessage({ isError: true, message: ERROR_LOGIN });
      } else {
        dispatch({ type: "LOGIN", payload: user.userName });
        setAuthMessage({ isError: false, message: SUCCESSFUL_LOGIN });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } else {
      const errorData = await response.json();
      setAuthMessage({ isError: true, message: errorData.message });
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
          <Link to="/signup">Go to Signup</Link>
        </LinkContainer>
        <InputAndErrorContainer>
          <UserInput
            placeholder="email"
            type="email"
            register={register}
            label={"email"}
            pattern={emailRegex}
            autoComplete="email"
          />
          {errors.email && <ErrorText>{ERROR_EMAIL}</ErrorText>}
        </InputAndErrorContainer>
        <UserInput
          placeholder="password"
          type="password"
          register={register}
          label={"password"}
          pattern={passwordRegex}
          autoComplete="off"
        />
        {errors.password && <ErrorText>{ERROR_PASSWORD}</ErrorText>}
        <ButtonContainer>
          <ContainedButton variant="outlined" type="submit">
            login
          </ContainedButton>
        </ButtonContainer>
        {authMessage && (
          <LoginMessage isError={authMessage.isError}>
            {authMessage.message}
          </LoginMessage>
        )}
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

const LinkTitle = styled.div`
  margin-right: 10px;
`;

const LinkContainer = styled.div`
  margin-bottom: 20px;
`;

const InputAndErrorContainer = styled.div`
  margin-bottom: 10px;
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
  color: ${({ isError }) => (isError ? "#8f2220" : "#7e7c0a")};
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-item: center;
`;
