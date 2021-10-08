import styled from "styled-components";
import {
  boxShadow,
  camouflageLink,
  responsivePaddingAround,
} from "styles/mixins";

const StyledList = styled.ul`
  border: 1px solid ${({ theme }) => theme.colors.secondaryLight};
  border-radius: ${({ theme }) => theme.border.radius};
  list-style: none;
  margin: 0;
  padding: 0;
`;
const Item = styled.li`
  ${camouflageLink}

  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryLight};
  & > a {
    ${responsivePaddingAround}

    &:hover {
      ${boxShadow};
    }
  }

  &:last-child {
    border-bottom: none;
    & > a {
      border-bottom-left-radius: ${({ theme }) => theme.border.radius};
      border-bottom-right-radius: ${({ theme }) => theme.border.radius};
    }
  }
  &:first-child {
    & > a {
      border-top-left-radius: ${({ theme }) => theme.border.radius};
      border-top-right-radius: ${({ theme }) => theme.border.radius};
    }
  }
`;

interface Props {
  className?: string;
  rows: { key: string; content: React.ReactNode }[];
}
export default function List({ className, rows }: Props) {
  return (
    <StyledList className={className}>
      {rows.map(({ key, content }) => (
        <Item key={key}>{content}</Item>
      ))}
    </StyledList>
  );
}
