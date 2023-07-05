import PropTypes from "prop-types";
import { Button, Modal, Rating, Typography } from "@mui/material";
import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { ReviewForm } from "./ReviewForm";

export const ReviewCard = ({
  id,
  userName,
  title,
  review,
  score,
  date,
  productId,
  // setReviewEditModalOpen,
}) => {
  const { user } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
    // setReviewEditModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    // setReviewEditModalOpen(false);
  };

  const handleRemoveReview = async () => {
    const response = await fetch(`/api/reviews/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Success: Review removed");
    } else {
      console.error("Error:", response.statusText);
    }
  };

  return (
    <ReviewCardWrapper>
      <SubWrapper>
        <Title>{title}</Title>
        <Rating name="read-only" value={score} readOnly />
      </SubWrapper>
      <Description color="text.secondary">{review}</Description>
      <CardBottomWrapper>
        <SubWrapper>
          <UserName color="text.secondary">by {userName}</UserName>
          <Date color="text.secondary">{date}</Date>
        </SubWrapper>
        <Modal open={modalOpen} onClose={handleCloseModal} disableEnforceFocus>
          <>
            <ReviewForm
              productId={productId}
              editMode={true}
              reviewId={id}
              name={userName}
              originalReview={{ title, review, score, date }}
            />
          </>
        </Modal>
        <ButtonContainer>
          {userName === user ? (
            <Button size="small" variant="outlined" onClick={handleOpenModal}>
              edit
            </Button>
          ) : (
            ""
          )}
          {userName === user ? (
            <Button
              size="small"
              variant="outlined"
              onClick={handleRemoveReview}
            >
              remove
            </Button>
          ) : (
            ""
          )}
        </ButtonContainer>
      </CardBottomWrapper>
    </ReviewCardWrapper>
  );
};

ReviewCard.propTypes = {
  id: PropTypes.string,
  userName: PropTypes.string,
  title: PropTypes.string,
  review: PropTypes.string,
  score: PropTypes.number,
  date: PropTypes.string,
  productId: PropTypes.string,
  setReviewEditModalOpen: PropTypes.func,
};

const ReviewCardWrapper = styled.div`
  width: 100%;
  margin-bottom: 60px;
  border-bottom: 1px solid ${(props) => props.theme.palette.custom.light};
  @media (min-width: 768px) {
    width: 70%;
  }
`;

const SubWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const Title = styled(Typography)`
  font-size: 1.2rem;
`;

const Description = styled(Typography)`
  margin-top: 0.5rem;
  width: 100%;
`;

const UserName = styled(Typography)`
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

const Date = styled(Typography)`
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

const CardBottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
`;
