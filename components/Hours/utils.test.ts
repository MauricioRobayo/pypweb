import { IHourData } from "@mauriciorobayo/pyptron";
import { ALL_DAY } from "lib/utils";
import { calculateHoursWithEndTime, nextEndTime, NextType } from "./utils";

describe("nextEndTime", () => {
  const baseDate = "2021-01-01";
  const cases: [[string, string], Date, [Date, NextType] | []][] = [
    [
      ["5:00", "8:00"],
      new Date(`${baseDate} 0:00`),
      [new Date(`${baseDate} 5:00`), NextType.START],
    ],
    [
      ["5:00", "8:00"],
      new Date(`${baseDate} 5:00`),
      [new Date(`${baseDate} 8:00`), NextType.END],
    ],
    [["5:00", "8:00"], new Date(`${baseDate} 8:00`), []],
  ];
  it.each(cases)(
    `should return the correct value for %p @%p`,
    (hours, currentDate, nextDate) => {
      expect(nextEndTime(hours, currentDate)).toEqual(nextDate);
    }
  );
});

describe("calculateHoursWithEndTime", () => {
  const cases: [
    IHourData["hours"],
    Date,
    ReturnType<typeof calculateHoursWithEndTime>
  ][] = [
    [[], new Date(), []],
    [[["00:00", "24:00"]], new Date(), [[ALL_DAY]]],
    [
      [
        ["7:00", "9:00"],
        ["11:30", "14:00"],
        ["17:30", "19:00"],
      ],
      new Date(2021, 0, 1, 6, 0, 0),
      [
        ["7:00am a 9:00am", new Date(2021, 0, 1, 7, 0, 0, 0), NextType.START],
        ["11:30am a 2:00pm"],
        ["5:30pm a 7:00pm"],
      ],
    ],
    [
      [
        ["7:00", "9:00"],
        ["11:30", "14:00"],
        ["17:30", "19:00"],
      ],
      new Date(2021, 0, 1, 11, 25, 0),
      [
        ["7:00am a 9:00am"],
        [
          "11:30am a 2:00pm",
          new Date(2021, 0, 1, 11, 30, 0, 0),
          NextType.START,
        ],
        ["5:30pm a 7:00pm"],
      ],
    ],
    [
      [
        ["7:00", "9:00"],
        ["11:30", "14:00"],
        ["17:30", "19:00"],
      ],
      new Date(2021, 0, 1, 13, 55, 0),
      [
        ["7:00am a 9:00am"],
        ["11:30am a 2:00pm", new Date(2021, 0, 1, 14, 0, 0, 0), NextType.END],
        ["5:30pm a 7:00pm"],
      ],
    ],
    [
      [
        ["7:00", "9:00"],
        ["11:30", "14:00"],
        ["17:30", "19:00"],
      ],
      new Date(2021, 0, 1, 19, 0, 0),
      [["7:00am a 9:00am"], ["11:30am a 2:00pm"], ["5:30pm a 7:00pm"]],
    ],
    [
      [["6:00", "5:00"]],
      new Date(2021, 0, 1, 7, 0, 0),
      [["6:00am a 5:00am", new Date(2021, 0, 2, 5, 0, 0, 0), NextType.END]],
    ],
  ];

  it.each(cases)(
    "should return the correct value for %j @%p",
    (hours, date, expected) => {
      expect(calculateHoursWithEndTime(hours, date)).toEqual(expected);
    }
  );
});
