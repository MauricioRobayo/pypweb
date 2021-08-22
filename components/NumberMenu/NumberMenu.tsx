import styled from "styled-components";
import { Numbers } from "./Numbers";

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

type NumberMenuProps = {
  citySlug: string;
  categorySlug: string;
  selectedNumber?: string;
};

export default function NumberMenu({
  citySlug,
  categorySlug,
  selectedNumber = "",
}: NumberMenuProps) {
  return (
    <Wrapper>
      <Title>¿Cuándo tengo pico y placa?</Title>
      <Container>
        <Numbers
          selectedNumber={selectedNumber}
          basePath={`${citySlug}/${categorySlug}`}
        />
      </Container>
    </Wrapper>
  );
}
