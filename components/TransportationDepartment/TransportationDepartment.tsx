import type { City } from "@mauriciorobayo/pyptron";
import { IconLeft } from "components/Icon";
import { Email } from "react-obfuscate-email";

interface Props {
  city: string;
  transportationDepartment: City["transportationDepartment"];
}
function TransportationDepartment({ city, transportationDepartment }: Props) {
  const { facebookHandle, twitterHandle, whatsapp, email, website } =
    transportationDepartment;
  return (
    <>
      <p>
        Puede dirigir sus inquietudes a cualquiera de los canales oficiales de
        la oficina de Tránsito y Transporte de la ciudad de {city}, en donde
        será atendida de manera oportuna:
      </p>
      <ul>
        {twitterHandle ? (
          <li>
            <a
              href={`https://twitter.com/${twitterHandle}`}
              target="_blank"
              rel="noopener noreferer noreferrer"
              title={`Cuenta oficial de Twitter de la Secretaría de Movilidad de ${city}`}
            >
              <IconLeft name="twitter" />
              Twitter
            </a>
          </li>
        ) : null}
        {facebookHandle ? (
          <li>
            <a
              href={`https://www.facebook.com/${facebookHandle}`}
              target="_blank"
              rel="noopener noreferer noreferrer"
              title={`Cuenta oficial de Facebook de la Secretaría de Movilidad de ${city}`}
            >
              <IconLeft name="facebook" />
              Facebook
            </a>
          </li>
        ) : null}

        {whatsapp ? (
          <li>
            <a
              href={`whatsapp://send?phone=${whatsapp}`}
              title={`Cuenta oficial de Whatsapp de la Secretaría de Movilidad de ${city}`}
            >
              <IconLeft name="whatsappFill" />
              Whatsapp
            </a>
          </li>
        ) : null}
        {website ? (
          <li>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferer noreferrer"
              title={`Sitio web oficial de la Secretaría de Movilidad de ${city}`}
            >
              <IconLeft name="website" />
              Página web
            </a>
          </li>
        ) : null}
        {email ? (
          <li>
            <Email
              email={email}
              title={`Correo electrónico oficial de la Secretaría de Movilidad de ${city}`}
            >
              <IconLeft name="emailFill" />
              Correo electrónico
            </Email>
          </li>
        ) : null}
      </ul>
    </>
  );
}

export default TransportationDepartment;
