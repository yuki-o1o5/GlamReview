import { Box, Button, FormControl, OutlinedInput } from "@mui/material";
import { useState } from "react";

export const ReviewForm = () => {
  const userName = "yuki";
  const [review, setReview] = useState("");

  const handleReview = (event) => {
    setReview(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // post methods

    console.log("UserName:", userName, "Review:", review);
  };

  return (
    <>
      <form action="post" onSubmit={onSubmit}>
        <Box component="div" noValidate autoComplete="off">
          <div>User:{userName}</div>
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
