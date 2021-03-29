import styled from "styled-components";

const StyledEmail = styled.span`
  color: ${({ color }) => color || "inherit"};
`;

type EmailProps = { color?: string };

export default function Email({ color }: EmailProps) {
  const emailCharactersCodes = [
    "105;",
    "110;",
    "102;",
    "111;",
    "064;",
    "112;",
    "121;",
    "112;",
    "104;",
    "111;",
    "121;",
    "046;",
    "099;",
    "111;",
    "109;",
  ];
  return (
    <StyledEmail
      color={color}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `&#${emailCharactersCodes.join("&#")}`,
      }}
    />
  );
}
