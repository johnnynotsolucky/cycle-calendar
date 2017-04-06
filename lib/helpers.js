import { indexF, sequentialArray } from './utils'

const addMonths = (d, months) => {
  const date = new Date(d)
  date.setMonth(date.getMonth() + months)
  return date
}

const weeks = () => sequentialArray(() => sequentialArray(indexF, 7), 6)

const cellWithinRange = (cell, offsetStart, end) =>
  cell > offsetStart && cell <= end + offsetStart

const calcStartOffset = (monthStart, start) => {
  const diff = monthStart - (start % 7)
  const offsetStart = diff < 0 ? (7 + diff) : diff
  return offsetStart
}

const dateFromCellF = (f, o) => {
  const { start, day, week, year, month, monthStart, monthEnd } = o
  const cell = (week * 7) + (day + 1)
  const offsetStart = calcStartOffset(monthStart, start)
  return cellWithinRange(cell, offsetStart, monthEnd) &&
    f(new Date(year, month, (cell - offsetStart)))
}

const isCurrent = ({ value, start, monthStart, monthEnd, year, month }) =>
  (day, week) =>
    dateFromCellF(
      d => (value && d ? d.getTime() === value.getTime() : false),
      { day, week, start, monthStart, monthEnd, year, month }
    )

const dayAtWeekPosition = ({ start, monthStart, monthEnd, year, month }) =>
  (day, week) =>
    dateFromCellF(
      d => (d ? d.getDate() : null),
      { day, week, start, monthStart, monthEnd, year, month }
    )

export {
  addMonths,
  dayAtWeekPosition,
  isCurrent,
  weeks,
}
