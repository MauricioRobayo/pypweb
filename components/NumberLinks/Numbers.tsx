import Link from "next/link";
import styled from "styled-components";

type NumberProps = {
  selected?: boolean;
};
const Number = styled.div<NumberProps>`
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

type NumbersProps = {
  selectedNumber: string;
  basePath: string;
};
export function Numbers({ selectedNumber, basePath }: NumbersProps) {
  const rows = [
    ["0", "1", "2", "3", "4"],
    ["5", "6", "7", "8", "9"],
  ];
  return rows.map((numbers) => {
    return (
      <div key={numbers.toString()}>
        {numbers.map((number) => {
          if (number === selectedNumber) {
            return (
              <Number key={number} selected>
                {number}
              </Number>
            );
          }
          return (
            <Link key={number} href={`/${basePath}/${number}`} passHref>
              <Anchor>
                <Number>{number}</Number>
              </Anchor>
            </Link>
          );
        })}
      </div>
    );
  });
}
