import { formatDistance } from "./utils";

describe("formatDistance", () => {
  const startDate = new Date(2021, 0, 1, 0, 0, 30, 0);

  const endDate0 = new Date(startDate);
  endDate0.setSeconds(-1);

  const endDate1 = new Date(startDate);
  endDate1.setHours(endDate1.getHours() + 5);

  const endDate2 = new Date(endDate1);
  endDate2.setMinutes(endDate2.getMinutes() - 10);

  const endDate3 = new Date(endDate2);
  endDate3.setSeconds(endDate3.getSeconds() - 10);

  const endDate4 = new Date(startDate);
  endDate4.setMinutes(endDate4.getMinutes() + 10);

  const endDate5 = new Date(startDate);
  endDate5.setMinutes(endDate5.getMinutes() + 6);

  const endDate6 = new Date(startDate);
  endDate6.setSeconds(endDate6.getSeconds() + 75);

  const endDate7 = new Date(startDate);
  endDate7.setSeconds(endDate7.getSeconds() + 15);

  // We offset all results by one minutes since we are
  // not showing seconds. We round up to the next minute.
  const cases: [Date, string][] = [
    [startDate, "1m"],
    [endDate0, "0m"],
    [endDate1, "5h 1m"],
    [endDate2, "4h 51m"],
    [endDate3, "4h 50m"],
    [endDate4, "11m"],
    [endDate5, "7m"],
    [endDate6, "2m"],
    [endDate7, "1m"],
  ];

  it.each(cases)(`%p - ${startDate.toISOString()} = %p`, (date, string) => {
    expect(formatDistance(date, startDate)).toBe(string);
  });
});
