export const isDay = (date: Date) => {
  return date.getHours() < 19 && date.getHours() > 4;
}