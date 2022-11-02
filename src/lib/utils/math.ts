export const calcProgress = (min: number, max: number, value: number) => (
  (value - min) / (max - min) * 100
)