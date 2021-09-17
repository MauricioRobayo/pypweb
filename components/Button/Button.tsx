import { MouseEventHandler, ReactNode } from "react";
import styled, { css } from "styled-components";

type Variant = "primary" | "secondary" | "link";

const variants = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.mainComplement};
    border: 2px solid ${({ theme }) => theme.colors.secondaryDark};
    &:hover {
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.mainComplement};
    border: 2px solid ${({ theme }) => theme.colors.secondaryDark};
    &:hover {
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
    }
  `,
  link: css`
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.main};
    margin: 0;
    padding: 0;
  `,
};

const StyledButton = styled.button<Pick<ButtonProps, "variant">>`
  ${({ variant }) => variant && variants[variant]};

  border-radius: 0.5em;
  display: inline-block;
  padding: 0.5em 1em;
  &:hover {
    cursor: pointer;
  }
`;

type ButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: Variant;
};
const Button = ({
  variant = "primary",
  children,
  onClick = () => null,
  className,
}: ButtonProps) => (
  <StyledButton
    className={className}
    onClick={onClick}
    variant={variant}
    type="button"
  >
    {children}
  </StyledButton>
);

export default Button;
