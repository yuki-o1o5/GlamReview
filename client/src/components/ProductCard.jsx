import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ url, title, id, price, rating }) => {
  const navigate = useNavigate();

  const handleClick = (productId) => {
    navigate(`/${productId}`);
  };

  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardActionArea onClick={() => handleClick(id)}>
        <img src={url} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {price}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {rating}
          </Typography>
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
