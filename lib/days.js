import xs from 'xstream'
import { div, a } from '@cycle/dom'
import { dayAtWeekPosition, isCurrent, weeks } from './helpers'

const renderDay = (selectedF, state) => (week, dayOfMonth, day) =>
  a('.calendar-cell.calendar-selectable.calendar-day', {
    class: {
      'calendar-selected': selectedF(day, week),
      'calendar-empty': !dayOfMonth
    },
    attrs: {
      'data-date': dayOfMonth && `${state.year}-${state.month}-${dayOfMonth}`
    }
  }, dayOfMonth)

export default ({ DOM: DOM$, props: props$ = xs.empty() }) => {
  const state$ = props$
    .map(state => Object.assign({}, state, {
      monthStart: new Date(state.year, state.month).getDay(),
      monthEnd: new Date(state.year, state.month + 1, 0).getDate()
    }))
    .remember()

  const vdom$ = state$
    .map((state) => {
      const getDay = dayAtWeekPosition(state)
      const checkIfCurrent = isCurrent(state)
      const renderDayWithState = renderDay(checkIfCurrent, state)
      return div('.calendar-section.calendar-days',
        weeks()
        .map((days, week) =>
          div('.calendar-row',
            days.map(day =>
              renderDayWithState(week, getDay(day, week), day)
            )
          )
        )
      )
    })

  return {
    DOM: vdom$,
    value: state$.map(state => state.value || {})
  }
}