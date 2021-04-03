import { MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: 2px solid #444;
  border-radius: 0.5em;
  display: inline-block;
  padding: 0.5em 1em;
  &:hover {
    background-color: white;
    box-shadow: 0 0 2.5px 0 rgba(0, 0, 0, 0.5);
    color: #444;
    cursor: pointer;
  }
`;

type ButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ children, onClick = () => null, className }: ButtonProps) => (
  <StyledButton className={className} onClick={onClick} type="button">
    {children}
  </StyledButton>
);

export default Button;
