import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";

import { Grid } from "@mui/material";

export const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductsData();
  }, []);

  const fetchProductsData = async () => {
    try {
      const res = await fetch(
        "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
      );
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.err(err);
    }
  };

  return (
    <>
      <div style={{ padding: "50px 50px" }}>
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {products.map((product, index) => {
            return (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <ProductCard
                  url={product.image_link}
                  title={product.name}
                  price={product.price}
                  id={product.id}
                  rating={product.rating}
                  key={index}
                />{" "}
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
};
