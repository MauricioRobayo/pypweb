import { PypDate } from "components/PypDate";
import { ReactNode } from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  align-self: center;
  max-width: ${({ theme }) => theme.width.normal};
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 1rem;
`;

const Subtitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.large};
  margin: 1rem 0 0;
`;

type HeaderProps = {
  className?: string;
  date: Date;
  showTodaysPrefix?: boolean;
  title: ReactNode;
};
export default function Header({
  className = "",
  date,
  showTodaysPrefix = true,
  title,
}: HeaderProps) {
  return (
    <StyledHeader className={className}>
      <Title>{title}</Title>
      <Subtitle>
        <PypDate date={date} showTodaysPrefix={showTodaysPrefix} />
      </Subtitle>
    </StyledHeader>
  );
}
