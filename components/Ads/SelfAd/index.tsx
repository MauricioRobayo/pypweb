import { Emoji } from "components/Emoji";
import React, { useEffect, useRef, useState } from "react";
import { Email } from "react-obfuscate-email";
import styled from "styled-components";
import { inlineIconLeft, inlineIconRight } from "styles/mixins";

const EmojiLeft = inlineIconLeft(Emoji);
const EmojiRight = inlineIconRight(Emoji);
const StyledEmail = styled(Email)`
  color: ${({ theme }) => theme.colors.main};
  text-decoration: none;
`;
const StyleButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.main};
  cursor: pointer;
  font-size: 0.85rem;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface SelfAdProps {
  className?: string;
}
export function SelfAd({ className }: SelfAdProps) {
  const bottomOfPageRef = useRef<HTMLDivElement>(null);
  const [shouldShowAdsInfo, setShouldShowAdsInfo] = useState(false);

  useEffect(() => {
    if (shouldShowAdsInfo && bottomOfPageRef.current) {
      bottomOfPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [shouldShowAdsInfo]);

  function showAdsInfo() {
    setShouldShowAdsInfo(true);
  }

  return (
    <Wrapper>
      {shouldShowAdsInfo ? (
        <div>
          <p>
            Mes a mes más de un millón de conductores en las principales
            ciudades del país nos consultan.
          </p>
          <p>
            <EmojiLeft emoji="🚐" />
            <EmojiLeft emoji="🚗" />
            <Emoji emoji="🚛" />
            <EmojiRight emoji="🛵" />
            <EmojiRight emoji="🚕" />
          </p>
          <p>
            <StyledEmail
              className={className}
              email="publicidad@pyphoy.com"
              rel="noreferrer noopener"
              subject="Solicitud info publicidad"
              target="_blank"
            />
          </p>
        </div>
      ) : (
        <StyleButton type="button" onClick={showAdsInfo}>
          <EmojiLeft emoji="📣" />
          Anuncie con nosotros
          <EmojiRight emoji="🤩" />
        </StyleButton>
      )}
      <div ref={bottomOfPageRef} />
    </Wrapper>
  );
}
