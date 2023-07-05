import styled from "styled-components";
import TopImage from "../assets/moreno-matkovic-kpWUwelRlJM-unsplash.jpg";

export const Hero = () => {
  return (
    <ImgWrapper>
      <Img src={TopImage} alt="top image" />
      <TextContainer>
        <Title>Welcome to GlamReview</Title>
        <Introduction>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad cupiditate
          consequatur accusamus voluptatum non error asperiores eaque soluta
          inventore quas! Culpa nesciunt ad repellendus cum neque sapiente nihil
          minus odio?
        </Introduction>
      </TextContainer>
    </ImgWrapper>
  );
};

const ImgWrapper = styled.section`
  @media (min-width: 768px) {
    display: flex;
  }
`;

const Img = styled.img`
  width: 100%;
  object-fit: contain;
  @media (min-width: 768px) {
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
  @media (min-width: 768px) {
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
  @media (min-width: 768px) {
    margin-top: 40px;
  }
`;
