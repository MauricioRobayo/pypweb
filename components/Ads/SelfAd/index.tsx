import { Button } from "components/Button";
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
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const CTA = styled.div`
  font-size: 0.85rem;
  text-transform: uppercase;
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
            <CTA>
              <EmojiLeft emoji="📣" />
              Anuncie con nosotros
              <EmojiRight emoji="🤩" />
            </CTA>
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
          <p>
            Mes a mes más de un millón de conductores en las principales
            ciudades del país nos visitan.
          </p>
          <p>
            <EmojiLeft emoji="🚙" />
            <EmojiLeft emoji="🚐" />
            <EmojiLeft emoji="🚗" />
            <Emoji emoji="🚛" />
            <EmojiRight emoji="🛵" />
            <EmojiRight emoji="🚕" />
            <EmojiRight emoji="🚚" />
          </p>
        </div>
      ) : (
        <Button onClick={showAdsInfo} variant="link">
          <CTA>
            <EmojiLeft emoji="📣" />
            Anuncie con nosotros
            <EmojiRight emoji="🤩" />
          </CTA>
        </Button>
      )}
      <div ref={bottomOfPageRef} />
    </Wrapper>
  );
}
