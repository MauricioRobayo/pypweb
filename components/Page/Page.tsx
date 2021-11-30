import { Aside } from "components/Aside";
import { CTA } from "components/CTA";
import { Header } from "components/Header";
import useLandingPage from "hooks/useLandingPage";
import React, { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

const StyledHeader = styled(Header)`
  margin-top: 1rem;
`;

const Main = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  padding: 0 1rem;
`;

interface Props {
  aside: ReactNode;
  date: Date;
  main: ReactNode;
  title: string;
}
export default function Page({ aside, date, main, title }: Props) {
  const { isLandingPage } = useLandingPage();
  return (
    <>
      <Wrapper>
        <StyledHeader
          date={date}
          title={title}
          prefix={isLandingPage ? "Hoy " : ""}
        />
        <Main>{main}</Main>
        <CTA />
      </Wrapper>
      <Aside>{aside}</Aside>
    </>
  );
}
