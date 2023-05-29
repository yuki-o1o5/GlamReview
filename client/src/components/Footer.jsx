import styled from "styled-components";

export default function Footer() {
  return (
    <SContainer>
      <div> Yuki &copy; 2023, All Rights Reserved </div>
    </SContainer>
  );
}

const SContainer = styled.div`
  background-color: ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.custom.main};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  font-family: "Varela", sans-serif;
`;
