import styled from "styled-components";

const StyledFixedHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.warningLighter};
  border-bottom: 1px solid ${({ theme }) => theme.colors.warning};
  font-size: 0.85rem;
  font-weight: bold;
  margin: 0;
  padding: 0.3em 1rem 0.25em;
  position: sticky;
  text-align: center;
  top: -1px;
  width: 100%;
  z-index: 1000;
`;
type FixedHeaderProps = {
  children: React.ReactNode;
};
function FixedHeader({ children }: FixedHeaderProps) {
  return <StyledFixedHeader>{children}</StyledFixedHeader>;
}

export default FixedHeader;
