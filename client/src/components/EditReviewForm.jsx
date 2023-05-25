import { Box, Button, FormControl, OutlinedInput } from "@mui/material";
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
          <div>{name}</div>
          <FormControl sx={{ width: "25ch" }}>
            <OutlinedInput value={editReview} onChange={handleReview} />
          </FormControl>
        </Box>
        <Button variant="outlined" type="submit">
          register
        </Button>
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
