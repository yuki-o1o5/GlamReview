import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Modal,
  Typography,
} from "@mui/material";

import { red } from "@mui/material/colors";
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
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={userName}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {review}
        </Typography>
      </CardContent>
      <CardActions>
        {userName === user ? (
          <Button size="small" color="primary" onClick={handleOpenModal}>
            edit
          </Button>
        ) : (
          ""
        )}

        {userName === user ? (
          <Button size="small" color="primary" onClick={handleRemoveReview}>
            remove
          </Button>
        ) : (
          ""
        )}
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
      </CardActions>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
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
    </Card>
  );
};

ReviewCard.propTypes = {
  id: PropTypes.string,
  userName: PropTypes.string,
  review: PropTypes.string,
  productId: PropTypes.string,
  fetchAllReviews: PropTypes.func,
};
