import { ReactNode } from "react";
import styled from "styled-components";

const StyledButton = styled.div`
  border: 2px solid #444;
  border-radius: 0.5em;
  display: inline-block;
  padding: 0.5em 1em;
  &:hover {
    background-color: white;
    box-shadow: 0 0 2.5px 0 rgba(0, 0, 0, 0.5);
    color: #444;
  }
`;

type ButtonProps = {
  children: ReactNode;
};

const Button = ({ children }: ButtonProps) => (
  <StyledButton>{children}</StyledButton>
);

export default Button;
