import {
  Card,
  CardActionArea,
  CardContent,
  Rating,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useProductReviews } from "../hooks/useProductReviews";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const { averageScore } = useProductReviews(product.id);

  const handleClick = (productId) => {
    navigate(`/${productId}`);
  };



  return (
    <StyledCard>
      <CardActionArea onClick={() => handleClick(product.id)}>
        <ImageWrapper>
          <img src={product.image_link} alt={product.name} />
        </ImageWrapper>
        <StyledCardContent>
          <Title gutterBottom variant="subtitle1" component="h2">
            {product.name}
          </Title>
          <Typography gutterBottom variant="subtitle1" component="h2">
            {product.price}
          </Typography>
          <ReviewContainer>
            <ReviewNumber gutterBottom variant="subtitle1" component="h3">
              {averageScore ? `${averageScore}` : `0`}
            </ReviewNumber>
            <Rating
              name="read-only"
              value={averageScore}
              readOnly
              size="small"
            />
          </ReviewContainer>
        </StyledCardContent>
      </CardActionArea>
    </StyledCard>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    image_link: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    rating: PropTypes.number,
  }),
};

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Title = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReviewNumber = styled(Typography)`
  margin-right: 10px;
`;

const ReviewContainer = styled.div`
  display: flex;
  align-items: center;
`;
