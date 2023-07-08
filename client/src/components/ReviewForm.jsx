import { Box, MenuItem, Select, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import styled from "styled-components";
import { forwardRef, useContext, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../contexts/UserContext";
import { Input } from "./Input";
import {
  ERROR_FORMREGISTER,
  PLACEHOLDER_REVIEW,
  PLACEHOLDER_TITLE,
  SUCCESSFUL_REVIEW_REGISTER,
  SUCCESSFUL_REVIEW_UPDATE,
} from "../constants/message";
import ContainedButton from "./ContainedButton";

// eslint-disable-next-line react/display-name
export const ReviewForm = forwardRef(
  (
    { productId, editMode = false, reviewId, originalReview, fetchAllReviews },
    ref
  ) => {
    const { user, userId } = useContext(UserContext);
    const [title, setTitle] = useState(editMode ? originalReview.title : "");
    const [review, setReview] = useState(editMode ? originalReview.review : "");
    const [score, setScore] = useState(editMode ? originalReview.score : 5);
    const [date, setDate] = useState(
      editMode ? dayjs(originalReview.date) : dayjs()
    );
    const [submitMessage, setSubmitMessage] = useState({
      isError: false,
      message: "",
    });

    const handleTitle = (event) => {
      setTitle(event.target.value);
    };

    const handleReview = (event) => {
      setReview(event.target.value);
    };

    const handleScore = (event) => {
      setScore(event.target.value);
    };

    const handleChangeDate = (newValue) => {
      setDate(newValue.toISOString());
    };

    const reviewNumberArray = [5, 4, 3, 2, 1];

    const handleCreateReview = async (event) => {
      event.preventDefault();
      if (title.trim() === "" || review.trim() === "") {
        setSubmitMessage({ isError: true, message: ERROR_FORMREGISTER });
        return;
      }

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          userId,
          title,
          review,
          score,
          date,
          productId,
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        setSubmitMessage({
          isError: false,
          message: SUCCESSFUL_REVIEW_REGISTER,
        });
        fetchAllReviews(productId);
      } else {
        if (response.status === 400) {
          setSubmitMessage({ isError: true, message: responseData.message });
        } else {
          console.error("Error:", response.statusText);
        }
      }
    };

    const handleUpdateReview = async (event) => {
      event.preventDefault();
      if (title.trim() === "" || review.trim() === "") {
        setSubmitMessage({ isError: true, message: ERROR_FORMREGISTER });
        return;
      }

      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, review, score, date }),
      });

      if (response.ok) {
        setSubmitMessage({
          isError: false,
          message: SUCCESSFUL_REVIEW_UPDATE,
        });
        fetchAllReviews(productId);
      } else {
        console.error("Error:", response.statusText);
      }
    };

    return (
      <>
        <StyledBox ref={ref}>
          <form
            action="post"
            onSubmit={editMode ? handleUpdateReview : handleCreateReview}
          >
            <Box component="div" noValidate>
              <Headline gutterBottom variant="h6" component="div">
                Review by <UserName> {user ? user : "Guest"}</UserName>
              </Headline>
              <InputTitle>Title</InputTitle>
              <Input
                value={title}
                placeholder={PLACEHOLDER_TITLE}
                onChange={handleTitle}
                multiline={false}
              />
              <InputTitle>Review</InputTitle>
              <Input
                value={review}
                placeholder={PLACEHOLDER_REVIEW}
                onChange={handleReview}
                multiline={true}
                rows={7}
              />
              <FlexContainer>
                <SelectContainer>
                  <InputTitle>Score</InputTitle>
                  <Select
                    value={score}
                    onChange={handleScore}
                    displayEmpty
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
              {editMode ? (
                <ContainedButton type="submit">update</ContainedButton>
              ) : (
                <ContainedButton type="submit">register</ContainedButton>
              )}
            </ButtonContainer>
            {submitMessage && (
              <SubmitMessage isError={submitMessage.isError}>
                {submitMessage.message}
              </SubmitMessage>
            )}
          </form>
        </StyledBox>
      </>
    );
  }
);

ReviewForm.propTypes = {
  productId: PropTypes.string,
  fetchAllReviews: PropTypes.func,
  editMode: PropTypes.bool,
  reviewId: PropTypes.string,
  originalReview: PropTypes.object,
  ref: PropTypes.any,
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

const InputTitle = styled(Typography)`
  margin-top: 1rem;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const InputSubTitle = styled(Typography)`
  margin-top: 1rem;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const FlexContainer = styled.div`
  @media (min-width: 768px) {
    display: flex;
    gap: 20px;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledBox = styled(Box)`
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  @media (min-width: 768px) {
    width: 40%;
    padding: 50px;
  }
`;

const SubmitMessage = styled(Typography)`
  color: ${({ isError }) => (isError ? "#8f2220" : "#7e7c0a")};
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-item: center;
`;
