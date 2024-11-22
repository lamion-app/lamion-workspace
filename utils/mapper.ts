export function mapChartDto(items: Array<ChartItemDto> | undefined) {
  if (!items || items.length == 0) return [];

  return items.map((x) => ({
    name: x.key,
    number: x.value,
  }));
}

export function mapTimeChartDto(
    items: Array<ChartItemDto> | undefined,
) {
  if (!items || items.length == 0) return [];

  return items.map((x) => ({
    key: parseISOTimeString(x.key),
    value: x.value,
  }));
}

export function mapDateChartDto(
    items: Array<ChartItemDto> | undefined,
) {
  if (!items || items.length == 0) return [];

  return items.map((x) => ({
    key: parseISODateString(x.key),
    value: x.value,
  }));
}

export function mapCalendarItems(items: Array<CalendarItemDto> | undefined) {
  if (!items || items.length == 0) return [];

  return items.map((x) => ({
    date: parseISODateString(x.date),
    types: new Map(
      Object.keys(x.types).map((v) => [
        CalendarActivityVariant[v as keyof typeof CalendarActivityVariant],
        x.types[v],
      ]),
    ),
  }));
}
