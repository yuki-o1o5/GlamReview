import { useEffect, useState } from "react";
import { Box, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Hero } from "../components/Hero";
import Footer from "../components/Footer";
import ProductsContainer from "../components/ProductsContainer";
import { fetchProductsByBrandName } from "../constants/fetchApi";

export const HomePage = () => {
  const [cliniqueProducts, setCliniqueProducts] = useState([]);
  const [covergirlProducts, setCovergirlProducts] = useState([]);
  const [lorealProducts, setLorealProducts] = useState([]);
  const [maybellineProducts, setMaybellineProducts] = useState([]);
  const [revlonProducts, setRevlonProducts] = useState([]);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getCliniqueProducts();
    getCovergirlProducts();
    getLorealProducts();
    getMaybellineProducts();
    getRevlonProducts();
  }, []);

  const getCliniqueProducts = async () => {
    try {
      const products = await fetchProductsByBrandName("clinique");
      setCliniqueProducts(products);
    } catch (err) {
      console.error(err);
    }
  };

  const getCovergirlProducts = async () => {
    try {
      const products = await fetchProductsByBrandName("covergirl");
      setCovergirlProducts(products);
    } catch (err) {
      console.error(err);
    }
  };

  const getLorealProducts = async () => {
    try {
      const products = await fetchProductsByBrandName("l'oreal");
      setLorealProducts(products);
    } catch (err) {
      console.error(err);
    }
  };

  const getMaybellineProducts = async () => {
    try {
      const products = await fetchProductsByBrandName("maybelline");
      setMaybellineProducts(products);
    } catch (err) {
      console.error(err);
    }
  };

  const getRevlonProducts = async () => {
    try {
      const products = await fetchProductsByBrandName("revlon");
      setRevlonProducts(products);
    } catch (err) {
      console.error(err);
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
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="clinique" value="1" />
                <Tab label="covergirl" value="2" />
                <Tab label="l'oreal" value="3" />
                <Tab label="maybelline" value="4" />
                <Tab label="revlon" value="5" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <ProductsContainer products={cliniqueProducts} />
            </TabPanel>
            <TabPanel value="2">
              <ProductsContainer products={covergirlProducts} />
            </TabPanel>
            <TabPanel value="3">
              <ProductsContainer products={lorealProducts} />
            </TabPanel>
            <TabPanel value="4">
              <ProductsContainer products={maybellineProducts} />
            </TabPanel>
            <TabPanel value="5">
              <ProductsContainer products={revlonProducts} />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
      <Footer />
    </>
  );
};
