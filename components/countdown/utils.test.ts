import { formatDistance } from "./utils";

describe("formatDistance", () => {
  const startDate = new Date();

  const date1 = new Date(startDate);
  date1.setHours(date1.getHours() + 5);

  const date2 = new Date(date1);
  date2.setMinutes(date2.getMinutes() - 10);

  const date3 = new Date(date2);
  date3.setSeconds(date3.getSeconds() - 10);

  const date4 = new Date(startDate);
  date4.setMinutes(date4.getMinutes() + 10);

  const date5 = new Date(date4);
  date5.setSeconds(date5.getSeconds() - 10);

  const cases: [Date, string][] = [
    [date1, "5h"],
    [date2, "4h 50m"],
    [date3, "4h 49m"],
    [date4, "10m"],
    [date5, "9m"],
  ];

  it.each(cases)(
    `difference between %p and ${startDate.toISOString()} should be %p`,
    (date, string) => {
      expect(formatDistance(date, startDate)).toBe(string);
    }
  );
});
