import styled from "styled-components";
import { responsivePaddingAround, secondaryText } from "styles/mixins";

const Quote = styled.blockquote`
  background-color: ${({ theme }) => theme.colors.secondaryLighter};
  border-radius: 0.5rem;
  margin: 1rem 1.5rem;
  ${responsivePaddingAround};
  p {
    margin: 0;
  }
  small {
    ${secondaryText}

    font-style: italic;
  }
`;

export function Fine() {
  return (
    <>
      <p>
        Los infractores a lo dispuesto serán sancionados según lo consagrado por
        el{" "}
        <a href="http://www.secretariasenado.gov.co/senado/basedoc/ley_0769_2002_pr003.html#131">
          artículo 131 literal C numeral 14 de la Ley 769 de 2002
        </a>{" "}
        modificado por el{" "}
        <a href="http://www.secretariasenado.gov.co/senado/basedoc/ley_1383_2010.html#21">
          artículo 21 de la Ley 1383 de 2010
        </a>
        :
      </p>
      <Quote>
        <p>
          <small>C.</small> Será sancionado con multa equivalente a quince (15)
          salarios mínimos legales diarios vigentes (SMLDV) el conductor y/o
          propietario de un vehículo automotor que incurra en cualquiera de las
          siguientes infracciones:
        </p>
        <p>
          <small>C.14.</small> Transitar por sitios restringidos o en horas
          prohibidas por la autoridad competente. Además, el vehículo será
          inmovilizado.
        </p>
      </Quote>
    </>
  );
}
