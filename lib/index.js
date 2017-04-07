import xs from 'xstream'
import { div } from '@cycle/dom'
import Header from './header'
import Weekdays from './weekdays'
import Days from './days'
import { addMonths } from './helpers'
import './styles.styl'

export default ({ DOM, props: props$ = xs.empty() }) => {
  const header = Header({
    DOM,
    props: props$
      .map(({ value, monthNames }) => ({
        date: value,
        months: monthNames
      }))
  })

  const weekdays = Weekdays({
    DOM,
    props: props$
      .map(({ start, dayNames }) => ({
        start,
        days: dayNames
      }))
  })

  const selectedDay$ = DOM
    .select('.calendar-selectable.calendar-day:not(.calendar-empty)')
    .events('click')
    .map(({ target }) => {
      const [year, month, day] = target.dataset.date.split('-').map(Number)
      return new Date(year, month, day)
    })

  const value$ = xs.merge(
    selectedDay$,
    props$.map(props => props.value)
  )

  const updatedProps$ = props$
    .map(({ start }) => value$
      .map(value => header.value
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
    )
    .flatten()

  const days = Days({
    DOM,
    props: updatedProps$
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
