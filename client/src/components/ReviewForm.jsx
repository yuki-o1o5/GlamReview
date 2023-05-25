import { Box, Button, FormControl, OutlinedInput } from "@mui/material";
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
          <div>User: {user ? user : "Guest"}</div>
          <FormControl sx={{ width: "25ch" }}>
            <OutlinedInput
              value={review}
              placeholder="Please enter text"
              onChange={handleReview}
            />
          </FormControl>
        </Box>
        <Button variant="outlined" type="submit">
          register
        </Button>
      </form>
    </>
  );
};

ReviewForm.propTypes = {
  productId: PropTypes.string,
  fetchAllReviews: PropTypes.func,
};
