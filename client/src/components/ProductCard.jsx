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

export const ProductCard = ({ url, title, id, price, rating }) => {
  const navigate = useNavigate();

  const handleClick = (productId) => {
    navigate(`/${productId}`);
  };

  return (
    <Card style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardActionArea onClick={() => handleClick(id)}>
        <ImageWrapper>
          <img src={url} alt={title} />
        </ImageWrapper>
        <CardContent
          style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
        >
          <Title gutterBottom variant="subtitle1" component="h2">
            {title}
          </Title>
          <Typography gutterBottom variant="subtitle1" component="h2">
            {price}
          </Typography>
          <ReviewContainer>
            <ReviewNumber gutterBottom variant="subtitle1" component="h3">
              {rating ? `${rating}` : `0`}
            </ReviewNumber>
            <Rating name="read-only" value={rating} readOnly size="small" />
          </ReviewContainer>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

ProductCard.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.number,
  price: PropTypes.string,
  rating: PropTypes.number,
};

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
