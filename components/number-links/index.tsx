import styled from "styled-components";
import row from "./row";

const Wrapper = styled.div`
  margin: 4rem 0 2rem;
  text-align: center;
`;

const Title = styled.h4`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

type NumberLinksProps = {
  citySlug: string;
  categorySlug: string;
  numberSelected?: string;
};

export default function NumberLinks({
  citySlug,
  categorySlug,
  numberSelected = "",
}: NumberLinksProps) {
  const Row = row(numberSelected, `${citySlug}/${categorySlug}`);
  return (
    <Wrapper>
      <Title>¿Cuándo tengo pico y placa?</Title>
      <Container>
        <Row numbers={["0", "1", "2", "3", "4"]} />
        <Row numbers={["5", "6", "7", "8", "9"]} />
      </Container>
    </Wrapper>
  );
}
