export enum CalendarActivityVariant {
  USERS,
  ERRORS,
  EVENTS,
}

export interface CalendarItem {
  date: Date;
  types: Map<CalendarActivityVariant, number>;
}
