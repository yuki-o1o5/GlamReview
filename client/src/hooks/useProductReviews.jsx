import { useEffect, useState } from "react";

export const useProductReviews = (productId) => {
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    const fetchAllReviews = async () => {
      const res = await fetch(`/api/reviews/${productId}`);
      const data = await res.json();
      const average =
        data.reduce((accum, curr) => accum + curr.score, 0) / data.length;
      setAverageScore(average);
    };

    fetchAllReviews();
  }, [productId]);

  return { averageScore };
};
