import { Emoji } from "components/Emoji";
import React from "react";
import { Email } from "react-obfuscate-email";
import styled from "styled-components";
import { inlineIconLeft, inlineIconRight } from "styles/mixins";

const EmojiLeft = inlineIconLeft(Emoji);
const EmojiRight = inlineIconRight(Emoji);
const StyledEmail = styled(Email)`
  color: ${({ theme }) => theme.colors.main};
  font-size: 0.85rem;
  text-decoration: none;
  text-transform: uppercase;
`;

export default function Self() {
  return (
    <StyledEmail
      body="Quisiera recibir información acerca de las opciones para anunciar con ustedes."
      email="publicidad@pyphoy.com"
      rel="noreferrer noopener"
      subject="Solicitud info publicidad"
      target="_blank"
    >
      <EmojiLeft emoji="📣" />
      Anuncie con nosotros
      <EmojiRight emoji="🤩" />
    </StyledEmail>
  );
}
