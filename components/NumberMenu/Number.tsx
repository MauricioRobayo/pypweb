import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

type StyledNumberProps = {
  selected?: boolean;
};
const StyledNumber = styled.div<StyledNumberProps>`
  align-items: center;
  background-color: ${({ selected, theme }) =>
    selected ? "white" : theme.colors.main};
  border: 2px solid
    ${({ selected, theme }) => (selected ? "currentColor" : theme.colors.main)};
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
  color: ${({ theme }) => theme.colors.mainComplement};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.colors.mainComplement};
  }
`;

type NumberProps = {
  number: string;
  selectedNumber: string;
};
export default function Number({ number, selectedNumber }: NumberProps) {
  const { pathname, query } = useRouter();
  if (number === selectedNumber) {
    return (
      <StyledNumber key={number} selected>
        {number}
      </StyledNumber>
    );
  }
  return (
    <Link
      href={{
        pathname,
        query: {
          ...query,
          number,
        },
      }}
      passHref
    >
      <Anchor>
        <StyledNumber>{number}</StyledNumber>
      </Anchor>
    </Link>
  );
}
