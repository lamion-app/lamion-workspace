export enum DatePeriod {
  DAY,
  WEEK,
  MONTH,
  YEAR,
  ALL_TIME,
}

export const DatePeriodEntries = [
  DatePeriod.DAY,
  DatePeriod.WEEK,
  DatePeriod.MONTH,
  DatePeriod.YEAR,
  DatePeriod.ALL_TIME,
];

export const datePeriodNames = new Map<DatePeriod, string>([
  [DatePeriod.DAY, "datetime.periods.daily"],
  [DatePeriod.WEEK, "datetime.periods.weekly"],
  [DatePeriod.MONTH, "datetime.periods.monthly"],
  [DatePeriod.YEAR, "datetime.periods.yearly"],
  [DatePeriod.ALL_TIME, "datetime.periods.all_time"],
]);
