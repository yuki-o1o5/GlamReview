export const fetchProductsByBrandName = (brandName) =>
  new Promise((resolve, reject) => {
    fetch(
      `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brandName}`
    )
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });

// export const fetchProductsByBrandName = async (brandName) => {
//   try {
//     const res = await fetch(
//       `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brandName}`
//     );
//     const data = await res.json();
//     return data;
//   } catch (err) {
//     console.err(err);
//   }
// };
