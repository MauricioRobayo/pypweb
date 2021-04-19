import { useRouter } from "next/router";
import { ChangeEventHandler, useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  align-items: center;
  display: grid;
  grid-template: 1 /1;
  width: 100%;
`;

type StyledSelectProps = {
  isShowingPlaceholder: boolean;
};
const StyledSelect = styled.select<StyledSelectProps>`
  appearance: none;
  border: 1px solid ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 0.4rem;
  color: ${({ isShowingPlaceholder, theme }) =>
    isShowingPlaceholder ? theme.colors.secondary : theme.colors.secondaryDark};
  grid-column: 1 / 1;
  grid-row: 1 / 1;
  margin: 0.5rem 0;
  padding: 0.5rem;
`;

const Option = styled.option`
  color: ${({ theme }) => theme.colors.secondaryDark};
`;

const Caret = styled.div`
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #000;
  display: block;
  grid-column: 1 /1;
  grid-row: 1/1;
  justify-self: end;
  margin-right: 0.5rem;
  pointer-events: none;
`;

type SelectProps = {
  options: {
    label: string;
    value: string;
  }[];
  name: string;
  placeholder: string;
};

const Select = ({ name, options, placeholder }: SelectProps) => {
  const [selected, setSelected] = useState("");
  const router = useRouter();

  const onChangeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { value } = event.target;

    setSelected(value);
    router.push(`/${value}`);
  };

  const routeChangeCompleteHandler = () => setSelected("");

  useEffect(() => {
    router.events.on("routeChangeComplete", routeChangeCompleteHandler);

    return () => {
      router.events.off("routeChangeComplete", routeChangeCompleteHandler);
    };
  }, []);

  return (
    <Wrapper>
      <StyledSelect
        isShowingPlaceholder={selected === ""}
        name={name}
        onChange={onChangeHandler}
        value={selected}
      >
        {[{ label: placeholder, value: "" }, ...options].map(
          ({ label, value }) => (
            <Option
              key={value}
              disabled={label === placeholder}
              hidden={label === placeholder}
              value={value}
            >
              {label}
            </Option>
          )
        )}
      </StyledSelect>
      <Caret />
    </Wrapper>
  );
};

export default Select;
