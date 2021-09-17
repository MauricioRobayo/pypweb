import styled from "styled-components";

const StyledPlaceholder = styled.div<
  Pick<AdPlaceholderProps, "height" | "width" | "maxWidth">
>`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.mainLight};
  border: 1px solid currentColor;
  color: ${({ theme }) => theme.colors.main};
  display: flex;
  font-weight: bold;
  height: ${({ height }) => height};
  justify-content: center;
  max-width: ${({ maxWidth, theme }) =>
    maxWidth === "" ? theme.maxWidth : maxWidth};
  text-transform: uppercase;
  width: 100%;
`;

type AdPlaceholderProps = {
  name: string;
  height: string;
  width?: string;
  maxWidth?: string;
  className?: string;
};
export function Placeholder({
  name,
  width = "100%",
  height,
  maxWidth = "",
  className = "",
}: AdPlaceholderProps) {
  return (
    <StyledPlaceholder
      className={className}
      height={height}
      maxWidth={maxWidth}
      width={width}
    >
      {name}
    </StyledPlaceholder>
  );
}
