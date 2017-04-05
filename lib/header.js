import xs from 'xstream'
import { div, a } from '@cycle/dom'
import { trace } from './utils'

const monthName = (months, index) => months && months[index];

export default ({ DOM: DOM$, props: props$ = xs.empty() }) => {
  const value$ = xs.merge(
    DOM$
    .select('.calendar-prev')
    .events('click')
    .mapTo(-1),
    DOM$
    .select('.calendar-next')
    .events('click')
    .mapTo(1)
  )

  const state$ = props$
    .map(props => value$
      .fold((acc, x) => acc + x, 0)
      .map(value =>
        Object.assign({}, props, { month: props.month + value }))
    )
    .flatten()

  const vdom$ = state$
    .map(trace('vdom'))
    .map(({ months, month, year }) =>
      div('.calendar-section.calendar-header', [
        div('.calendar-row', [
          a('.calendar-nav.calendar-cell.calendar-prev', { attrs: { href: '#' } }, '<'),
          a('.calendar-nav.calendar-cell.calendar-title',
            { attrs: { href: '#' } },
            `${monthName(months, month)} ${year}`),
          a('.calendar-nav.calendar-cell.calendar-next', { attrs: { href: '#' } }, '>')
        ])
      ])
    )

  return {
    DOM: vdom$,
    value: value$
  }
}
