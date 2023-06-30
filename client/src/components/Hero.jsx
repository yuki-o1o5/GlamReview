import styled from "styled-components";
import TopImage from "../assets/moreno-matkovic-kpWUwelRlJM-unsplash.jpg";

export const Hero = () => {
  return (
    <ImgWrapper>
      <Img src={TopImage} alt="top image" />
      <TextContainer>
        <Title>Welcome to SPARKLESCOOP</Title>
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
  display: flex;
`;

const Img = styled.img`
  width: 50%;
  object-fit: contain;
`;

const TextContainer = styled.div`
  width: 50%;
  padding: 0 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(251 252 254);
`;

const Title = styled.h1`
  font-family: "Kdam Thmor Pro", sans-serif;
  color: #7f0858;
`;

const Introduction = styled.div`
  font-family: "Kdam Thmor Pro", sans-serif;
  margin-top: 40px;
  color: #c597a0;
`;
