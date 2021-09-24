import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

export type Path = {
  name: string;
  path: string;
};

export type PathSelectProps = {
  options: Path[];
  selected: string;
  title: string;
};

const PathSelect = ({ options, selected, title }: PathSelectProps) => {
  const [selectedPath, setSelectedPath] = useState(selected);
  const router = useRouter();

  const onHandleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPath(e.target.value);

    router.push({
      pathname: router.pathname,
      query: {
        city: router.query.city,
        category: e.target.value,
      },
    });
  };

  return (
    <select onChange={onHandleChange} title={title} value={selectedPath}>
      {options.map(({ name, path }) => (
        <option key={path} value={path}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default PathSelect;
