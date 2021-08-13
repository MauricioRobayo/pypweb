import { Email } from "components/Email";
import { ReEmoji } from "components/ReEmoji";
import React from "react";
import styled from "styled-components";
import { inlineIconLeft, inlineIconRight } from "styles/mixins";

const EmojiLeft = inlineIconLeft(ReEmoji);
const EmojiRight = inlineIconRight(ReEmoji);
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
      rel="noreferrer"
      subject="Solicitud info publicidad"
      target="_blank"
    >
      <EmojiLeft emoji="📣" />
      Anuncie con nosotros
      <EmojiRight emoji="🤩" />
    </StyledEmail>
  );
}
