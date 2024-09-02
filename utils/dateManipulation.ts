export function formatDateToEnglish(date: Date) {
  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = monthsOfYear[date.getMonth()];

  return `${dayOfWeek} ${dayOfMonth} ${month}`
}