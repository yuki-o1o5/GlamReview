import { Box, Button, Modal } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReviewForm } from "../components/ReviewForm";
import { ReviewCard } from "../components/ReviewCard";
import { UserContext } from "../App";

export const ProductPage = () => {
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useContext(UserContext);
  let { id } = useParams();
  const productId = id;

  useEffect(() => {
    fetchProductsDataById(productId);
    fetchAllReviews(productId);
  }, [productId]);

  const fetchProductsDataById = async (productId) => {
    const res = await fetch(
      `http://makeup-api.herokuapp.com/api/v1/products/${productId}.json`
    );
    const data = await res.json();
    setProduct(data);
  };

  const fetchAllReviews = async (productId) => {
    const res = await fetch(`/api/reviews/${productId}`);
    const data = await res.json();
    setReviews(data);
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <img src={product.image_link} alt={product.name} />
      <div>{product.name}</div>
      <div>{product.description}</div>

      {user && !reviews.find((item) => item.user === user) ? (
        <Button variant="outlined" onClick={handleOpenModal}>
          Create
        </Button>
      ) : (
        ""
      )}

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
          <ReviewForm productId={productId} fetchAllReviews={fetchAllReviews} />
        </Box>
      </Modal>

      {reviews.map((item, index) => (
        <ReviewCard
          id={item._id}
          userName={item.user}
          review={item.review}
          key={index}
          productId={productId}
          fetchAllReviews={fetchAllReviews}
        />
      ))}
    </>
  );
};
