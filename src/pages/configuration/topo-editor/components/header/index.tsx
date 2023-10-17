import styled from "styled-components";

const Container = styled.div`
  grid-area: header;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 0.2rem solid #f5f5f5;
`;

export const Header = () => {
  return <Container>header</Container>;
};
