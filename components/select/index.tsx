import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { PypOption } from "types";

type WrapperProps = {
  type: "main" | "normal";
};

const Wrapper = styled.div<WrapperProps>`
  align-items: center;
  background: white;
  border: 1px solid lightgray;
  border-radius: 0.4rem;
  display: flex;
  justify-content: flex-start;
  margin: ${({ type }) => (type === "main" ? "0.5rem 0" : "0")};
  padding: ${({ type }) => (type === "main" ? "0.5rem" : "0.25rem")};
  &:focus-within {
    box-shadow: 0 0 0.25rem 0 ${({ theme }) => theme.colors.linkColor};
  }
`;

const Input = styled.input`
  border: none;
  flex: 1 1 100%;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: gray;
  }
`;

const SearchIcon = styled.span`
  display: inline-block;
  fill: gray;
  height: 1rem;
  width: 1rem;

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;

type SelectProps = {
  pypOptions: PypOption[];
  type?: "main" | "normal";
};

export default function Select({ pypOptions, type = "main" }: SelectProps) {
  const [selectedOption, setSelectedOption] = useState("");
  const router = useRouter();

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const { value: targetValue } = event.target;

    const isAvailableOption = pypOptions.some(({ name: optionName }) => {
      const regexp = new RegExp(targetValue, "i");
      return regexp.test(optionName);
    });

    if (!isAvailableOption) {
      return;
    }

    const targetOption = pypOptions.find(
      ({ name: optionName }) => optionName === targetValue
    );

    if (targetOption) {
      setSelectedOption(targetOption.name);
      router.push(`/${targetOption.value}`);
    } else {
      setSelectedOption(targetValue);
    }
  }

  return (
    <>
      <Wrapper type={type}>
        <SearchIcon>
          <svg
            focusable="false"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 20.5 6 C 12.515556 6 6 12.515562 6 20.5 C 6 28.484438 12.515556 35 20.5 35 C 23.773158 35 26.788919 33.893018 29.220703 32.050781 L 38.585938 41.414062 A 2.0002 2.0002 0 1 0 41.414062 38.585938 L 32.050781 29.220703 C 33.893017 26.788918 35 23.773156 35 20.5 C 35 12.515562 28.484444 6 20.5 6 z M 20.5 10 C 26.322685 10 31 14.677319 31 20.5 C 31 23.295711 29.914065 25.820601 28.148438 27.697266 A 2.0002 2.0002 0 0 0 27.701172 28.144531 C 25.824103 29.912403 23.29771 31 20.5 31 C 14.677315 31 10 26.322681 10 20.5 C 10 14.677319 14.677315 10 20.5 10 z" />
          </svg>
        </SearchIcon>
        <Input
          aria-label="Pico y placa en:"
          id="pypOption"
          list="pyp-options"
          onChange={onChangeHandler}
          placeholder="Ciudad"
          value={selectedOption}
        />
      </Wrapper>
      <datalist id="pyp-options">
        {pypOptions.map(({ name: optionName, value }) => (
          <option key={value} aria-label={optionName} value={optionName} />
        ))}
      </datalist>
    </>
  );
}
