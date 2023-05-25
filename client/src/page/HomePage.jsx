import { useContext, useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { UserContext } from "../App";

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  // const [user, setUser] = useState("");
  const { user } = useContext(UserContext);

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
      <h2>hello</h2>
      <h2>{user ? user : "Guest"}</h2>
      {products.map((product, index) => {
        return (
          <ProductCard
            url={product.image_link}
            title={product.name}
            price={product.price}
            id={product.id}
            rating={product.rating}
            key={index}
          />
        );
      })}
    </>
  );
};
