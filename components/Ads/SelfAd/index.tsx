import { Button } from "components/Button";
import { Icon } from "components/Icon";
import React, { useEffect, useRef, useState } from "react";
import { Email } from "react-obfuscate-email";
import styled from "styled-components";
import { inlineIconLeft, inlineIconRight } from "styles/mixins";

const IconLeft = inlineIconLeft(Icon);
const IconRight = inlineIconRight(Icon);
const StyledEmail = styled(Email)`
  color: ${({ theme }) => theme.colors.main};
  text-decoration: none;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const CTA = styled.div`
  font-size: ${({ theme }) => theme.font.size.small};
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
              <IconLeft name="📣" />
              Anuncie con nosotros
              <IconRight name="🤩" />
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
            <IconLeft name="🚙" />
            <IconLeft name="🚐" />
            <IconLeft name="🚗" />
            <Icon name="🚛" />
            <IconRight name="🛵" />
            <IconRight name="🚕" />
            <IconRight name="🚚" />
          </p>
        </div>
      ) : (
        <Button onClick={showAdsInfo} variant="link">
          <CTA>
            <IconLeft name="📣" />
            Anuncie con nosotros
            <IconRight name="🤩" />
          </CTA>
        </Button>
      )}
      <div ref={bottomOfPageRef} />
    </Wrapper>
  );
}
