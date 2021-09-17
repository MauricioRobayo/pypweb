import styled from "styled-components";

const StyledPlaceholder = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.mainLight};
  border: 1px solid currentColor;
  color: ${({ theme }) => theme.colors.main};
  display: flex;
  font-weight: bold;
  justify-content: center;
  text-transform: uppercase;
`;

type AdPlaceholderProps = {
  name: string;
  className?: string;
};
export function Placeholder({ name, className = "" }: AdPlaceholderProps) {
  return <StyledPlaceholder className={className}>{name}</StyledPlaceholder>;
}
