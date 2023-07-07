import { Grid } from "@mui/material";
import { ProductCard } from "./ProductCard";
import PropTypes from "prop-types";
import styled from "styled-components";

export default function ProductsContainer({ products }) {
  return (
    <StyledGrid
      container
      spacing={{ xs: 1, md: 2 }}
      columns={{ xs: 3, sm: 8, md: 12 }}
    >
      {products.map((product, index) => {
        return (
          <Grid item xs={12} sm={4} md={4} key={index}>
            <ProductCard product={product} key={index} />
          </Grid>
        );
      })}
    </StyledGrid>
  );
}

ProductsContainer.propTypes = {
  products: PropTypes.array,
};

const StyledGrid = styled(Grid)`
  display: flex;
  justify-content: center;
`;
