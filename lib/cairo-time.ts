const cairoFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Africa/Cairo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function getCairoParts(date: Date) {
  const parts = cairoFormatter.formatToParts(date);
  return Object.fromEntries(parts.map(({ type, value }) => [type, Number(value)])) as {
    year: number;
    month: number;
    day: number;
  };
}

export function getCairoDateKey(date: Date) {
  return cairoFormatter.format(date);
}

export function getCairoDayStart(daysAgo = 0, now = new Date()) {
  const { year, month, day } = getCairoParts(now);
  const targetDate = new Date(Date.UTC(year, month - 1, day - daysAgo));
  const targetUtcMidnight = Date.UTC(
    targetDate.getUTCFullYear(),
    targetDate.getUTCMonth(),
    targetDate.getUTCDate(),
  );

  let utcInstant = targetUtcMidnight;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const local = getCairoParts(new Date(utcInstant));
    const localHour = Number(
      new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Cairo',
        hour: '2-digit',
        hourCycle: 'h23',
      }).format(new Date(utcInstant)),
    );
    const localDateAsUtc = Date.UTC(local.year, local.month - 1, local.day, localHour);
    const offset = localDateAsUtc - utcInstant;
    utcInstant = targetUtcMidnight - offset;
  }

  return new Date(utcInstant).toISOString();
}
