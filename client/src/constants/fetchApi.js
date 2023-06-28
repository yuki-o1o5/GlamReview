export const fetchProductsByBrandName = async (brandName) => {
  try {
    const res = await fetch(
      `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brandName}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.err(err);
  }
};
