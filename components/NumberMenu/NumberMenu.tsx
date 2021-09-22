import { useRouter } from "next/router";
import styled from "styled-components";
import Number from "./Number";

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
  selectedNumber?: string;
};

export default function NumberMenu({ selectedNumber = "" }: NumberMenuProps) {
  const {
    query: { category: categorySlug, city: citySlug },
  } = useRouter();

  const rows = [
    ["0", "1", "2", "3", "4"],
    ["5", "6", "7", "8", "9"],
  ];

  return (
    <Wrapper>
      <Title>¿Cuándo tengo pico y placa?</Title>
      <Container>
        {rows.map((row) => {
          return (
            <div key={row.toString()}>
              {row.map((number) => (
                <Number
                  key={number}
                  number={number}
                  selectedNumber={selectedNumber}
                  basePath={`${citySlug}/${categorySlug}`}
                />
              ))}
            </div>
          );
        })}
      </Container>
    </Wrapper>
  );
}
