import type { IHourData } from "@mauriciorobayo/pyptron";
import { convert24toAmPm } from "lib/dateUtils";
import { ALL_DAY } from "lib/utils";

export const Next = {
  START: 0,
  END: 1,
} as const;

export type NextType = typeof Next[keyof typeof Next];

export const nextEndTime = (
  hours: [string, string] | [],
  date = new Date()
): [Date, NextType] | [] => {
  if (hours.length === 0) {
    return [];
  }

  const [startTime, endTime] = hours;
  const [startTimeHour, startTimeMinute] = startTime.split(":");
  const [endTimeHour, endTimeMinute] = endTime.split(":");

  const startDate = new Date(date);
  startDate.setHours(parseInt(startTimeHour, 10));
  startDate.setMinutes(parseInt(startTimeMinute, 10));
  startDate.setSeconds(0);

  if (startDate > date) {
    return [startDate, Next.START];
  }

  const endDate = new Date(date);
  endDate.setHours(parseInt(endTimeHour, 10));
  endDate.setMinutes(parseInt(endTimeMinute, 10));
  endDate.setSeconds(0);

  if (
    parseInt(startTime.replace(":", ""), 10) >=
    parseInt(endTime.replace(":", ""), 10)
  ) {
    endDate.setDate(endDate.getDate() + 1);
  }

  if (endDate > date) {
    return [endDate, Next.END];
  }

  return [];
};

export type CalculatedHours = ([string, Date, NextType] | [string] | [])[];
export const calculateHoursWithEndTime = (
  hours: IHourData["hours"],
  date = new Date()
) => {
  let alreadyDisplayedTimeEnd = false;
  const result: CalculatedHours = [];

  hours.forEach((hour) => {
    if (hour.length === 0) {
      result.push([]);
      return;
    }

    if (alreadyDisplayedTimeEnd) {
      result.push([hour.map(convert24toAmPm).join(" a ")]);
      return;
    }

    const end = nextEndTime(hour, date);

    alreadyDisplayedTimeEnd = end.length > 0;

    const [startHour, endHour] = hour;

    if (startHour === "00:00" && endHour === "24:00") {
      result.push([ALL_DAY]);
      return;
    }

    const [endTime, endType] = end;

    if (endTime !== undefined && endType !== undefined) {
      result.push([hour.map(convert24toAmPm).join(" a "), endTime, endType]);
      return;
    }

    result.push([hour.map(convert24toAmPm).join(" a ")]);
  });

  return result;
};
