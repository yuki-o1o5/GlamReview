import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";

import { Grid, Typography } from "@mui/material";

import { Hero } from "../components/Hero";

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
      <Hero />
      <div
        style={{
          padding: "0px 170px 50px",
        }}
      >
        {/* <HeroSection /> */}
        <Typography
          gutterBottom
          variant="subtitle1"
          component="h1"
          style={{
            padding: "50px 0",
            fontFamily: '"Kdam Thmor Pro", sans-serif',
            color: "#7F0858",
          }}
        >
          ALL PRODUCTS
        </Typography>
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 3, sm: 8, md: 12 }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {products.map((product, index) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
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
