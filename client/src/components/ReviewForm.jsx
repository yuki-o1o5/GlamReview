import {
  Box,
  Button,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import styled from "styled-components";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../App";

export const ReviewForm = ({
  productId,
  fetchAllReviews,
  editMode = false,
  reviewId,
  originalReview,
}) => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState(editMode ? originalReview.title : "");
  const [review, setReview] = useState(editMode ? originalReview.review : "");
  const [score, setScore] = useState(editMode ? originalReview.score : 5);
  const [date, setDate] = useState(
    editMode ? dayjs(originalReview.date) : dayjs()
  );

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleReview = (event) => {
    setReview(event.target.value);
  };

  const handleScore = (event) => {
    setScore(event.target.value);
  };

  console.log(score, "score");

  const handleChangeDate = (newValue) => {
    setDate(newValue.toISOString());
  };

  const reviewNumberArray = [5, 4, 3, 2, 1];

  const handleCreateReview = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, title, review, score, date, productId }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Success:", data);
      fetchAllReviews(productId);
    } else {
      console.error("Error:", response.statusText);
    }
  };

  const handleUpdateReview = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, review, score, date }),
    });

    if (response.ok) {
      console.log("Success: Review updated");
      fetchAllReviews(productId);
    } else {
      console.error("Error:", response.statusText);
    }
  };

  return (
    <StyledBox>
      <form
        action="post"
        onSubmit={editMode ? handleUpdateReview : handleCreateReview}
      >
        <Box component="div" noValidate autoComplete="off">
          <Headline gutterBottom variant="h6" component="div">
            Review by <UserName> {user ? user : "Guest"}</UserName>
          </Headline>

          <StyledFormControl fullWidth>
            <InputTitle>Title</InputTitle>
            <OutlinedInput
              value={title}
              placeholder="Please write your review title!"
              onChange={handleTitle}
            />
          </StyledFormControl>
          <InputTitle>Review</InputTitle>
          <StyledFormControl fullWidth>
            <OutlinedInput
              value={review}
              placeholder="Please write your review!"
              onChange={handleReview}
              multiline
              rows={7}
            />
          </StyledFormControl>
          <FlexContainer>
            <SelectContainer>
              <InputTitle>Score</InputTitle>
              <Select
                value={score}
                onChange={handleScore}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                fullWidth
                variant="outlined"
              >
                {reviewNumberArray.map((num) => {
                  return (
                    <MenuItem value={num} key={num}>
                      {num}
                    </MenuItem>
                  );
                })}
              </Select>
            </SelectContainer>
            <SelectContainer>
              <InputSubTitle>Date</InputSubTitle>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker value={date} onChange={handleChangeDate} />
                </DemoContainer>
              </LocalizationProvider>
            </SelectContainer>
          </FlexContainer>
        </Box>
        <ButtonContainer>
          <Button variant="outlined" type="submit">
            register
          </Button>
        </ButtonContainer>
      </form>
    </StyledBox>
  );
};

ReviewForm.propTypes = {
  productId: PropTypes.string,
  fetchAllReviews: PropTypes.func,
  editMode: PropTypes.bool,
  reviewId: PropTypes.string,
  originalReview: PropTypes.object,
};

const Headline = styled(Typography)`
  margin-bottom: 30px;
`;

const UserName = styled.span`
  color: ${(props) => props.theme.palette.custom.main};
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

const InputTitle = styled.div`
  margin-top: 1rem;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const InputSubTitle = styled.div`
  margin-top: 1rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledBox = styled(Box)`
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 50px;
`;
