import styled, { css } from "styled-components";
import { size } from "./constants";

export const inlineIcon = (component: any) => styled(component)`
  margin-right: 0.5rem;
`;

export const boxShadow = (blurRadius = 10) => css`
  box-shadow: rgb(122 122 122) 0 0 ${blurRadius}px 0;
`;

export const responsivePaddingAround = css`
  padding: 0.5rem;
  @media only screen and (min-width: ${size.sm}) {
    padding: 1rem;
  }
`;

export const camouflageLink = css`
  a,
  a:hover {
    color: inherit;
    text-decoration: none;
  }
`;

export const flexHorizontalCenterVerticalEnd = css`
  align-items: flex-end;
  display: flex;
  justify-content: center;
`;

export const flexCenter = css`
  align-items: center;
  display: flex;
  justify-content: center;
`;
