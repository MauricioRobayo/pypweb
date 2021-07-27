import { PypDate } from "components/PypDate";
import { ReactNode } from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  align-self: center;
  max-width: ${({ theme }) => theme.maxWidth};
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0 1rem;
`;

const Subtitle = styled.h2`
  font-size: 1.2rem;
  margin: 1rem 0 0;
`;

type HeaderProps = {
  title: ReactNode;
  date: Date;
};
export default function Header({ title, date }: HeaderProps) {
  return (
    <StyledHeader>
      <Title>{title}</Title>
      <Subtitle>
        <PypDate date={date} />
      </Subtitle>
    </StyledHeader>
  );
}
