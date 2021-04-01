import { css } from "styled-components";
import { size } from "./constants";

// eslint-disable-next-line import/prefer-default-export
export const padding = css`
  padding: 0.5rem;
  @media only screen and (min-width: ${size.sm}) {
    padding: 1rem;
  }
`;
