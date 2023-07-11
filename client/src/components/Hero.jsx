import styled from "styled-components";
import TopImage from "/hero.jpg";

export const Hero = () => {
  return (
    <ImgWrapper>
      <Img src={TopImage} alt="top image" />
      <TextContainer>
        <Title>Welcome to GlamReview</Title>
        <Introduction>
          Your personal guide to the world of cosmetics. Our platform is
          designed to empower you, the user, by providing you with comprehensive
          information on a wide range of cosmetic products. But we don't stop at
          just the product details. We believe in the power of shared
          experiences, and that's why we invite all our users to read, create,
          edit, and even delete product reviews.
        </Introduction>
      </TextContainer>
    </ImgWrapper>
  );
};

const ImgWrapper = styled.section`
  @media (min-width: 1024px) {
    display: flex;
  }
`;

const Img = styled.img`
  width: 100%;
  object-fit: contain;
  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(251 252 254);

  @media (min-width: 1024px) {
    width: 50%;
    padding: 0 100px;
  }
`;

const Title = styled.h1`
  font-family: "Kdam Thmor Pro", sans-serif;
  color: #7f0858;
`;

const Introduction = styled.div`
  font-family: "Kdam Thmor Pro", sans-serif;
  margin: 0 20px 30px;
  color: #c597a0;
  @media (min-width: 1024px) {
    margin: 0 10px 20px;
  }
`;
