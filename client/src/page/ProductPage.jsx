import { Box, Button, Modal, Rating, Typography } from "@mui/material";
import styled from "styled-components";
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
    console.log(data, "data");
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
    <PageContainer>
      <ProductContainer>
        <ImageContainer>
          <img src={product.image_link} alt={product.name} />
        </ImageContainer>
        <TextsContainer>
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {product.price}
          </Typography>
          <ReviewContainer>
            <ReviewNumber gutterBottom variant="h6" component="div">
              {product.rating ? `${product.rating}` : `0 review`}
            </ReviewNumber>
            <Rating name="read-only" value={product.rating || 0} readOnly />
          </ReviewContainer>
          <Typography gutterBottom component="div">
            {product.description}
          </Typography>
          <ButtonContainer>
            {user && !reviews.find((item) => item.user === user) ? (
              <Button variant="outlined" onClick={handleOpenModal}>
                Create
              </Button>
            ) : (
              ""
            )}
          </ButtonContainer>
        </TextsContainer>
      </ProductContainer>
      <AllReviewsWrapper>
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
            <ReviewForm
              productId={productId}
              fetchAllReviews={fetchAllReviews}
            />
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
      </AllReviewsWrapper>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  padding: 10px 120px;
`;

const ProductContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 50px 0 50px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
`;

const TextsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
`;

const ReviewNumber = styled(Typography)`
  margin-right: 10px;
`;

const ReviewContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AllReviewsWrapper = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
`;
