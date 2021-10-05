import { useRouter } from "next/router";
import { ChangeEventHandler, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  align-items: center;
  display: grid;
  grid-template: 1fr / 1fr;
`;

const StyledSelect = styled.select`
  appearance: none;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 0.4em;
  color: ${({ theme }) => theme.colors.secondaryDark};
  grid-column: 1 / 1;
  grid-row: 1 / 1;
  padding: 0.5em 2em 0.5em 0.5em;
`;

const Option = styled.option``;

const Caret = styled.div`
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #000;
  display: block;
  grid-column: 1 /1;
  grid-row: 1/1;
  justify-self: end;
  margin-right: 0.5em;
  pointer-events: none;
`;

type SelectProps = {
  options: {
    name: string;
    path: string;
  }[];
  selected?: string;
  name: string;
  placeholder?: string;
  className?: string;
};

const Select = ({
  name,
  options,
  placeholder = "",
  selected = "",
  className = "",
}: SelectProps) => {
  const { push } = useRouter();
  const [value, setValue] = useState(selected);

  const onChangeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { value } = event.target;

    setValue(value);
    push(value);
  };

  return (
    <Wrapper className={className}>
      <StyledSelect
        title={name}
        name={name}
        onChange={onChangeHandler}
        value={value}
      >
        {[{ name: placeholder, path: "" }, ...options].map(({ name, path }) => (
          <Option
            key={path}
            disabled={name === placeholder}
            hidden={name === placeholder}
            value={path}
          >
            {name}
          </Option>
        ))}
      </StyledSelect>
      <Caret />
    </Wrapper>
  );
};

export default Select;
