import styled from "styled-components";
import { Row } from "./Row";

const Wrapper = styled.div`
  margin: 2rem 0;
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
  selectedNumber?: string;
};

export default function NumberLinks({
  citySlug,
  categorySlug,
  selectedNumber = "",
}: NumberLinksProps) {
  return (
    <Wrapper>
      <Title>¿Cuándo tengo pico y placa?</Title>
      <Container>
        <Row
          selectedNumber={selectedNumber}
          basePath={`${citySlug}/${categorySlug}`}
          numbers={["0", "1", "2", "3", "4"]}
        />
        <Row
          selectedNumber={selectedNumber}
          basePath={`${citySlug}/${categorySlug}`}
          numbers={["5", "6", "7", "8", "9"]}
        />
      </Container>
    </Wrapper>
  );
}
