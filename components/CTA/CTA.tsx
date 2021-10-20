import { Button } from "components/Button";
import { IconLeft } from "components/Icon";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Email } from "react-obfuscate-email";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.mainDark};
  color: ${({ theme }) => theme.colors.mainComplement};
  padding: 1rem;
  text-align: center;
  width: 100%;
  p {
    margin: 0 0 1rem 0;
  }
`;
const ContactOptions = styled.ul`
  color: inherit;
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin: 1rem 0 0 0;
  padding: 0;
`;
const ContactOption = styled.li`
  font-size: 2rem;
  margin: 0 0.5rem 0;
  a {
    color: inherit;
  }
`;

export default function CTA() {
  const { asPath } = useRouter();
  const [shouldShowContactOptions, setShouldShowContactOptions] =
    useState(false);
  const [path, setPath] = useState("");

  useEffect(() => {
    if (window !== undefined) {
      setPath(window.location.href);
    }
  }, [asPath]);

  function showContactOptions() {
    setShouldShowContactOptions(true);
  }

  return (
    <Wrapper>
      <p>¿Algo no está bien?</p>
      {shouldShowContactOptions ? (
        <ContactOptions>
          <ContactOption>
            <a
              href={`whatsapp://send?phone=${process.env.NEXT_PUBLIC_PYPHOY_CONTACT_PHONE}&text=Hay un error en ${path}`}
              title="WhatsApp"
            >
              <IconLeft name="whatsappLine" />
            </a>
          </ContactOption>
          <ContactOption>
            <a href="http://m.me/picoyplacahoy" title="Facebook messenger">
              <IconLeft name="messengerLine" />
            </a>
          </ContactOption>
          <ContactOption>
            <Email
              email={process.env.NEXT_PUBLIC_PYPHOY_CONTACT_EMAIL || ""}
              title="Correo electrónico"
              subject={`Hay un error en ${path}`}
            >
              <IconLeft name="emailLine" />
            </Email>
          </ContactOption>
        </ContactOptions>
      ) : (
        <Button onClick={showContactOptions} variant="secondary">
          Ayúdenos a mejorar esta página
        </Button>
      )}
    </Wrapper>
  );
}
