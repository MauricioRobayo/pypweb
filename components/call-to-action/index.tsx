import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #0f266e;
  color: white;
  padding: 1rem;
  text-align: center;
  width: 100%;
  p {
    margin: 0.5rem;
    a {
      color: white;
      font-weight: bold;
    }
  }
`;

export default function CTA() {
  return (
    <Wrapper>
      <p>¿Falta algo?</p>
      <p>¿Algo no está bien?</p>
      <p>
        <a href="http://m.me/picoyplacahoy">Ayúdenos a mejorar esta página</a>
      </p>
    </Wrapper>
  );
}
