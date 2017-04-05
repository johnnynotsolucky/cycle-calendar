import xs from 'xstream'
import { div } from '@cycle/dom'
import Header from './header'
import Weekdays from './weekdays'
import Days from './days'

export default ({ DOM: DOM$, props: props$ = xs.empty() }) => {
  const header = Header({
    DOM: DOM$,
    props: props$
      .map(({ value, monthNames }) => ({
        month: value.getMonth(),
        year: value.getFullYear(),
        months: monthNames
      }))
  })

  const weekdays = Weekdays({
    DOM: DOM$,
    props: props$
      .map(({ start, dayNames }) => ({
        start,
        days: dayNames
      }))
  })

  const days = Days({
    DOM: DOM$,
    props: props$
      .map(({ value, start }) => header.value
        .startWith(0)
        .fold((acc, x) => acc + x, 0)
        .map(change => ({
          month: value.getMonth() + change,
          year: value.getYear(),
          value,
          start
        }))
      )
      .flatten()
  })

  return {
    DOM: xs.combine(header.DOM, weekdays.DOM, days.DOM, days.value)
      .map(([headerVDom, weekdaysVDom, daysVDom, val]) =>
        div([
          div([
            headerVDom,
            weekdaysVDom,
            daysVDom
          ]),
          div('.val', val && val.toString())
        ])
      )
  }
}
