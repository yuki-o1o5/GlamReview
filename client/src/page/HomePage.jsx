import { useEffect, useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Hero } from "../components/Hero";
import Footer from "../components/Footer";
import ProductsContainer from "../components/ProductsContainer";
import { fetchProductsByBrandName } from "../constants/fetchApi";
import styled from "styled-components";

export const HomePage = () => {
  const [products, setProducts] = useState({
    clinique: [],
    covergirl: [],
    maybelline: [],
    milani: [],
    revlon: [],
  });
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const brands = [
        "clinique",
        "covergirl",
        "maybelline",
        "milani",
        "revlon",
      ];
      const brandProductsPromises = brands.map((brand) =>
        fetchProductsByBrandName(brand)
      );
      const brandProductsArray = await Promise.all(brandProductsPromises);
      const newProducts = brands.reduce((acc, brand, idx) => {
        acc[brand] = brandProductsArray[idx];
        return acc;
      }, {});
      setProducts(newProducts);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Hero />
      <Wrapper>
        <Text gutterBottom variant="subtitle1" component="h1">
          ALL PRODUCTS
        </Text>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="clinique" value="1" />
                <Tab label="covergirl" value="2" />
                <Tab label="maybelline" value="3" />
                <Tab label="milani" value="4" />
                <Tab label="revlon" value="5" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <ProductsContainer products={products.clinique} />
            </TabPanel>
            <TabPanel value="2">
              <ProductsContainer products={products.covergirl} />
            </TabPanel>
            <TabPanel value="3">
              <ProductsContainer products={products.maybelline} />
            </TabPanel>
            <TabPanel value="4">
              <ProductsContainer products={products.milani} />
            </TabPanel>
            <TabPanel value="5">
              <ProductsContainer products={products.revlon} />
            </TabPanel>
          </TabContext>
        </Box>
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.section`
  padding: 0px 170px 50px;
`;

// const StyledBox = styled(Box)`
//   border-bottom: 1rem;
// `;

const Text = styled.section`
  padding: 50px 0;
  font-family: "Kdam Thmor Pro", sans-serif;
  color: #7f0858;
`;
