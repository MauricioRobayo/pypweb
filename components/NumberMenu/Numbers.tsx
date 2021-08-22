import Number from "./Number";

type NumbersProps = {
  selectedNumber: string;
  basePath: string;
};
export function Numbers({ selectedNumber, basePath }: NumbersProps) {
  const rows = [
    ["0", "1", "2", "3", "4"],
    ["5", "6", "7", "8", "9"],
  ];
  return (
    <>
      {rows.map((row) => {
        return (
          <div key={row.toString()}>
            {row.map((number) => (
              <Number
                key={number}
                number={number}
                selectedNumber={selectedNumber}
                basePath={basePath}
              />
            ))}
          </div>
        );
      })}
    </>
  );
}
