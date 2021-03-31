import Link from "next/link";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 4rem 0 2rem;
  text-align: center;
`;

const Title = styled.h4`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

type NumberProps = {
  selected?: boolean;
};
const Number = styled.div<NumberProps>`
  align-items: center;
  background-color: ${({ selected, theme }) =>
    selected ? "white" : theme.colors.linkColor};
  border: 2px solid
    ${({ selected, theme }) =>
      selected ? "currentColor" : theme.colors.linkColor};
  border-radius: 50%;
  box-sizing: border-box;
  cursor: ${({ selected }) => (selected ? "auto" : "pointer")};
  display: inline-flex;
  font-size: 1.25rem;
  height: 0.5rem;
  justify-content: center;
  margin: 0.5rem;
  padding: 1rem;
  text-align: center;
  width: 0.5rem;
`;
const Anchor = styled.a`
  color: white;
  &:hover {
    color: white;
  }
`;

type NumberLinksProps = {
  citySlug: string;
  categorySlug: string;
  numberSelected?: string | null;
};

export default function NumberLinks({
  citySlug,
  categorySlug,
  numberSelected = null,
}: NumberLinksProps) {
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <Wrapper>
      <Title>¿Cuándo tengo pico y placa?</Title>
      <div>
        {numbers.map((number) => {
          if (number === numberSelected) {
            return (
              <Number key={number} selected>
                {number}
              </Number>
            );
          }
          return (
            <Link
              key={number}
              href={`/${citySlug}/${categorySlug}/${number}`}
              passHref
            >
              <Anchor>
                <Number>{number}</Number>
              </Anchor>
            </Link>
          );
        })}
      </div>
    </Wrapper>
  );
}
