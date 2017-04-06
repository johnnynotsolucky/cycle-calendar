import xs from 'xstream'
import { div } from '@cycle/dom'
import Header from './header'
import Weekdays from './weekdays'
import Days from './days'
import { addMonths } from './helpers'
import './styles.styl'

export default ({ DOM: DOM$, props: props$ = xs.empty() }) => {
  const header = Header({
    DOM: DOM$,
    props: props$
      .map(({ value, monthNames }) => ({
        date: value,
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
        .map(change => {
          const date = addMonths(value, change)
          return {
            month: date.getMonth(),
            year: date.getFullYear(),
            value,
            start
          }
        })
      )
      .flatten()
  })

  const vdom$ = xs.combine(header.DOM, weekdays.DOM, days.DOM)
    .map(([headerVDom, weekdaysVDom, daysVDom]) =>
      div('.calendar', [
        div('.calendar-container', [
          headerVDom,
          weekdaysVDom,
          daysVDom
        ])
      ])
    )

  return {
    DOM: vdom$,
    value: days.value
  }
}
