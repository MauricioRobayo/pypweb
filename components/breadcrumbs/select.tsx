import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

export type Path = {
  name: string;
  slug: string;
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

    const currentPath = router.asPath.split("/");
    currentPath.pop();

    router.push(`${currentPath.join("/")}/${e.target.value}`);
  };

  return (
    <select onChange={onHandleChange} title={title} value={selectedPath}>
      {options.map(({ name, slug }) => (
        <option key={slug} value={slug}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default PathSelect;
