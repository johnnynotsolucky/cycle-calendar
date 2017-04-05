import xs from 'xstream'
import { div } from '@cycle/dom'
import { sequentialArray, shift } from './utils'

const shiftWeekdays = (arr, start) => sequentialArray(shift(arr, start), 7)

export default ({ DOM: DOM$, props: props$ = xs.empty() }) => ({
  DOM: props$
  .map(({ start, days }) =>
    div('.calendar-section.calendar-weekdays', [
      div('.calendar-row',
        shiftWeekdays(days, start)
        .map(day => div('.calendar-cell.calendar-weekday', day))
      )
    ])
  )
})
