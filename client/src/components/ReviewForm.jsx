import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../App";

export const ReviewForm = ({ productId, fetchAllReviews }) => {
  const { user } = useContext(UserContext);
  const [review, setReview] = useState("");

  const handleReview = (event) => {
    setReview(event.target.value);
  };

  const handleCreateReview = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, review, productId }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Success:", data);
      fetchAllReviews(productId);
    } else {
      console.error("Error:", response.statusText);
    }

    // console.log("UserName:", userName, "Review:", review);
  };

  return (
    <>
      <form action="post" onSubmit={handleCreateReview}>
        <Box component="div" noValidate autoComplete="off">
          <Title gutterBottom variant="h6" component="div">
            Conmment By <UserName> {user ? user : "Guest"}</UserName>
          </Title>
          <StyledFormControl fullWidth>
            <OutlinedInput
              value={review}
              placeholder="Please write your review!"
              onChange={handleReview}
              multiline
              rows={10}
            />
          </StyledFormControl>
        </Box>
        <ButtonContainer>
          <Button variant="outlined" type="submit">
            register
          </Button>
        </ButtonContainer>
      </form>
    </>
  );
};

ReviewForm.propTypes = {
  productId: PropTypes.string,
  fetchAllReviews: PropTypes.func,
};

const Title = styled(Typography)`
  margin-bottom: 30px;
`;

const UserName = styled.span`
  color: ${(props) => props.theme.palette.secondary.dark};
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const StyledFormControl = styled(FormControl)`
  .MuiOutlinedInput-root {
    fieldset {
      border-color: ${(props) => props.theme.palette.secondary.dark};
    }
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.palette.secondary.dark};
    }
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.palette.secondary.dark};
    }
  }
`;
