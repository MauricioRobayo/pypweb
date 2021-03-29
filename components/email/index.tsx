export default function Email({ color = "inherit" }: { color?: string }) {
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
  /* eslint-disable react/no-danger */
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: `&#${emailCharactersCodes.join("&#")}`,
      }}
      style={{ color }}
    />
  );
}
