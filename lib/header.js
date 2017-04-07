import xs from 'xstream'
import { div, a } from '@cycle/dom'
import { addMonths } from './helpers'

const monthName = (months, index) => months && months[index];

export default ({ DOM, props: props$ = xs.empty() }) => {
  const value$ = xs.merge(
    DOM
    .select('.calendar-prev')
    .events('click')
    .mapTo(-1),
    DOM
    .select('.calendar-next')
    .events('click')
    .mapTo(1)
  )

  const state$ = props$
    .map(props => value$
      .fold((acc, x) => acc + x, 0)
      .map(value =>
        Object.assign({}, props, { date: addMonths(props.date, value) })
      )
    )
    .flatten()

  const vdom$ = state$
    .map(({ months, date }) =>
      div('.calendar-section.calendar-header', [
        div('.calendar-row', [
          a('.calendar-nav.calendar-cell.calendar-selectable.calendar-prev'),
          a('.calendar-nav.calendar-cell.calendar-title',
            `${monthName(months, date.getMonth())} ${date.getFullYear()}`),
          a('.calendar-nav.calendar-cell.calendar-selectable.calendar-next')
        ])
      ])
    )

  return {
    DOM: vdom$,
    value: value$
  }
}
