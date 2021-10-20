import type { City } from "@mauriciorobayo/pyptron";
import { IconLeft } from "components/Icon";
import { Email } from "react-obfuscate-email";

interface Props {
  city: string;
  transportationDepartment: City["transportationDepartment"];
}
function TransportationDepartment({ city, transportationDepartment }: Props) {
  const { facebook, twitter, whatsapp, email, website } =
    transportationDepartment;
  return (
    <>
      <p>
        El Pico y Placa para {city} es regulado por la{" "}
        <a
          href={transportationDepartment.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          Secretaría de Movilidad de {city}
        </a>
        .
      </p>
      <p>
        Puede dirigir sus inquietudes a cualquiera de los canales oficiales de
        la oficina de tránsito y transporte de {city} en donde podrá será
        atendida de manera oportuna:
      </p>
      <ul>
        {facebook ? (
          <li>
            <a
              href={`https://www.facebook.com/${facebook}`}
              target="_blank"
              rel="noopener noreferer noreferrer"
            >
              <IconLeft name="facebook" />
              Facebook
            </a>
          </li>
        ) : null}
        {twitter ? (
          <li>
            <a
              href={`https://twitter.com/${twitter}`}
              target="_blank"
              rel="noopener noreferer noreferrer"
            >
              <IconLeft name="twitter" />
              Twitter
            </a>
          </li>
        ) : null}
        {whatsapp ? (
          <li>
            <a href={`whatsapp://send?phone=${whatsapp}`}>
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
            >
              <IconLeft name="website" />
              Página web
            </a>
          </li>
        ) : null}
        {email ? (
          <li>
            <Email email={email}>
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
