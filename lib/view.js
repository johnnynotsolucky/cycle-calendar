import xs from 'xstream'
import { div, a } from '@cycle/dom'
import { dayAtWeekPosition, isCurrent, weeks } from './helpers'
import { sequentialArray, shift } from './utils'

const monthName = (months, index) => months && months[index];

const renderHeader = state$ =>
  state$
  .map(({ monthNames, date }) =>
    div('.calendar-section.calendar-header', [
      div('.calendar-row', [
        a('.calendar-nav.calendar-cell.calendar-selectable.calendar-prev'),
        a('.calendar-nav.calendar-cell.calendar-title',
          `${monthName(monthNames, date.getMonth())} ${date.getFullYear()}`),
        a('.calendar-nav.calendar-cell.calendar-selectable.calendar-next')
      ])
    ])
  )

const shiftWeekdays = (arr, start) => sequentialArray(shift(arr, start), 7)

const renderWeekdays = props$ =>
  props$
  .map(({ start, dayNames }) =>
    div('.calendar-section.calendar-weekdays', [
      div('.calendar-row',
        shiftWeekdays(dayNames, start)
        .map(day => div('.calendar-cell.calendar-weekday', day))
      )
    ])
  )

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

const renderDays = state$ =>
  state$
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

export default (props$, state) =>
  xs
  .combine(
    renderHeader(state.header),
    renderWeekdays(props$),
    renderDays(state.days)
  )
  .map(([headerVDom, weekdaysVDom, daysVDom]) =>
    div('.calendar', [
      div('.calendar-container', [
        headerVDom,
        weekdaysVDom,
        daysVDom
      ])
    ])
  )
