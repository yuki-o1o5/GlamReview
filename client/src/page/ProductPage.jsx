import { Box, Button, Modal, Rating, Typography } from "@mui/material";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();

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
  console.log(reviews, "reviews");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleGotoLogin = () => navigate("/login");

  return (
    <>
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
              {!user ? (
                <Button variant="outlined" onClick={handleGotoLogin}>
                  Create Review
                </Button>
              ) : !reviews.find((review) => review.user === user) ? (
                <Button variant="outlined" onClick={handleOpenModal}>
                  Create Review
                </Button>
              ) : null}
            </ButtonContainer>
          </TextsContainer>
        </ProductContainer>
        <AllReviewsWrapper>
          <Modal open={modalOpen} onClose={handleCloseModal}>
            <StyledBox>
              <ReviewForm
                productId={productId}
                fetchAllReviews={fetchAllReviews}
              />
            </StyledBox>
          </Modal>
          {reviews.map((item, index) => (
            <ReviewCard
              id={item._id}
              userName={item.user}
              title={item.title}
              review={item.review}
              score={item.score}
              date={item.date}
              key={index}
              productId={productId}
              fetchAllReviews={fetchAllReviews}
            />
          ))}
        </AllReviewsWrapper>
      </PageContainer>
    </>
  );
};

const PageContainer = styled.div`
  padding: 10px 170px;
`;

const ProductContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 50px 0 50px;
  gap: 30px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  background-color: #fff;
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
  align-items: flex-end;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
`;

const StyledBox = styled(Box)`
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px;
`;
