import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { useState } from "react";
import PropTypes from "prop-types";

export const EditReviewForm = ({
  reviewId,
  name,
  originalReview,
  productId,
  fetchAllReviews,
}) => {
  const [editReview, setEditReview] = useState(originalReview);

  const handleReview = (event) => {
    setEditReview(event.target.value);
  };

  const handleUpdateReview = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ review: editReview }),
    });

    if (response.ok) {
      console.log("Success: Review updated");
      fetchAllReviews(productId);
    } else {
      console.error("Error:", response.statusText);
    }
  };

  return (
    <>
      <form onSubmit={handleUpdateReview}>
        <Box component="div" noValidate autoComplete="off">
          <Title gutterBottom variant="h6" component="div">
            Conmment By <UserName> {name}</UserName>
          </Title>
          <StyledFormControl fullWidth>
            <OutlinedInput
              value={editReview}
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

EditReviewForm.propTypes = {
  reviewId: PropTypes.string,
  name: PropTypes.string,
  originalReview: PropTypes.string,
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
