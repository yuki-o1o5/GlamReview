import { Grid } from "@mui/material";
import { ProductCard } from "./ProductCard";
import PropTypes from "prop-types";

export default function ProductsContainer({ products }) {
  return (
    <Grid
      container
      spacing={{ xs: 1, md: 2 }}
      columns={{ xs: 3, sm: 8, md: 12 }}
      style={{ display: "flex", justifyContent: "center" }}
    >
      {products.map((product, index) => {
        return (
          <Grid item xs={12} sm={4} md={4} key={index}>
            <ProductCard product={product} key={index} />
          </Grid>
        );
      })}
    </Grid>
  );
}

ProductsContainer.propTypes = {
  products: PropTypes.array,
};
