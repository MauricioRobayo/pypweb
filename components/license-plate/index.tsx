import React from "react";
import styled from "styled-components";

type LicenseSize = keyof typeof licenseFontSize;
type StyledLicensePlateProps = {
  isPublic: boolean;
  size: LicenseSize;
};
const licenseFontSize = {
  large: "1.5em",
  medium: "1em",
  small: "0.75em",
};
const BG_COLOR = "#f7c000";
const PUBLIC_BG_COLOR = "white";
const getBackgroundColor = ({ isPublic }: StyledLicensePlateProps) =>
  isPublic ? PUBLIC_BG_COLOR : BG_COLOR;
const StyledLicensePlate = styled.div<StyledLicensePlateProps>`
  align-items: center;
  background-color: ${getBackgroundColor};
  border: 0.15em solid currentColor;
  border-radius: 0.25em;
  box-shadow: 0 0 0 0.1em ${getBackgroundColor};
  color: black;
  display: inline-flex;
  font-family: LicensePlate, monospace, sans-serif;
  font-size: ${({ size }) => licenseFontSize[size]};
  font-weight: bold;
  justify-content: center;
  line-height: 1rem;
  margin: 1.5px;
  padding: 0.4em 0.25em 0.25em;
  text-transform: uppercase;
  white-space: nowrap;
`;

type LicensePlateProps = {
  children: React.ReactNode;
  isPublic?: boolean;
  size?: LicenseSize;
};

export default function LicensePlate({
  children,
  isPublic = false,
  size = "medium",
}: LicensePlateProps) {
  return (
    <StyledLicensePlate isPublic={isPublic} size={size}>
      {children}
    </StyledLicensePlate>
  );
}

LicensePlate.defaultProps = {
  isPublic: false,
  size: "medium",
};
