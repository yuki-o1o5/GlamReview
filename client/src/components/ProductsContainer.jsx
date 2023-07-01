/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { ProductCard } from "./ProductCard";

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
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ProductCard product={product} key={index} />
          </Grid>
        );
      })}
    </Grid>
  );
}
