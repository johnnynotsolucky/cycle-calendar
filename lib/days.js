import xs from 'xstream'
import { div, a } from '@cycle/dom'
import { dayAtWeekPosition, isCurrent, weeks } from './helpers'

export default ({ DOM: DOM$, props: props$ = xs.empty() }) => {
  const value$ = DOM$
    .select('.calendar-selectable.calendar-day')
    .events('click')
    .map(({ target }) => {
      const [year, month, day] = target.dataset.date.split('-').map(Number)
      return new Date(year, month, day)
    })

  const state$ = props$
    .map(props => value$
      .map(value => Object.assign({}, props, { value }))
      .startWith(props)
    )
    .flatten()
    .map(state => ({
      ...state,
      monthStart: new Date(state.year, state.month).getDay(),
      monthEnd: new Date(state.year, state.month + 1, 0).getDate()
    }))
    .remember()

  const vdom$ = state$
    .map(({ year, month, monthStart, monthEnd, value, start }) => {
      const getDay = dayAtWeekPosition(start, monthStart, monthEnd, year, month)
      const checkIfCurrent = isCurrent(value, start, monthStart, monthEnd, year, month)
      return div('.calendar-section.calendar-days',
        weeks()
        .map((days, week) =>
          div('.calendar-row',
            days.map(day => {
              const dayOfMonth = getDay(day, week)
              return a('.calendar-cell.calendar-selectable.calendar-day', {
                class: {
                  'calendar-selected': checkIfCurrent(day, week),
                  'calendar-empty': !dayOfMonth
                },
                attrs: {
                  'data-date': `${year}-${month}-${dayOfMonth}`
                }
              }, getDay(day, week))
            })
          )
        )
      )
    })

  return {
    DOM: vdom$,
    value: state$.map(state => state.value)
  }
}
