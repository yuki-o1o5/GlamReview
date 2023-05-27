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
        <ImageContainer>
          <img src={url} alt={title} />
        </ImageContainer>
        <CardContent
          style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
        >
          <Title gutterBottom variant="h6" component="div">
            {title}
          </Title>
          <Typography gutterBottom variant="h5" component="div">
            {price}
          </Typography>
          <ReviewContainer>
            <ReviewNumber gutterBottom variant="h6" component="div">
              {rating ? `${rating}` : `0`}
            </ReviewNumber>
            <Rating name="read-only" value={rating} readOnly />
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

const ImageContainer = styled.div`
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
