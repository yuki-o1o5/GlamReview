import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import styled from "styled-components";

import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import { EditReviewForm } from "./EditReviewForm";

export const ReviewCard = ({
  id,
  userName,
  review,
  productId,
  fetchAllReviews,
}) => {
  const { user } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleRemoveReview = async () => {
    const response = await fetch(`/api/reviews/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Success: Review removed");
      fetchAllReviews(productId);
    } else {
      console.error("Error:", response.statusText);
    }
  };

  return (
    <ReviewWrapper>
      <NameContainer>
        <Avatar
          sx={{ bgcolor: (theme) => theme.palette.custom.dark }}
          alt={userName}
        ></Avatar>
        <UserName variant="h6" component="div">
          {userName}
        </UserName>
      </NameContainer>
      <ReviewDescription variant="body2" color="text.secondary">
        {review}
      </ReviewDescription>
      <ButtonContainer>
        {userName === user ? (
          <Button size="small" variant="outlined" onClick={handleOpenModal}>
            edit
          </Button>
        ) : (
          ""
        )}
        {userName === user ? (
          <Button size="small" variant="outlined" onClick={handleRemoveReview}>
            remove
          </Button>
        ) : (
          ""
        )}
      </ButtonContainer>
      {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            width: "450px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 7,
          }}
        >
          <EditReviewForm
            reviewId={id}
            name={userName}
            originalReview={review}
            productId={productId}
            fetchAllReviews={fetchAllReviews}
          />
        </Box>
      </Modal>
    </ReviewWrapper>
  );
};

ReviewCard.propTypes = {
  id: PropTypes.string,
  userName: PropTypes.string,
  review: PropTypes.string,
  productId: PropTypes.string,
  fetchAllReviews: PropTypes.func,
};

const ReviewWrapper = styled.div`
  width: 70%;
  margin-bottom: 60px;
  border-bottom: 1px solid ${(props) => props.theme.palette.custom.light};
`;

const NameContainer = styled.div`
  display: flex;
`;

const UserName = styled(Typography)`
  margin-left: 20px;
`;

const ReviewDescription = styled(Typography)`
  margin: 40px 0;
`;

const ButtonContainer = styled.div`
  margin: 30px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;
