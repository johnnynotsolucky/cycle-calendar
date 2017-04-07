import xs from 'xstream'
import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import { div } from '@cycle/dom'
import Calendar from '../lib'
import { monthNames, dayNames } from '../lib/utils'
import './styles.styl'

const main = ({ DOM }) => {
  const calendar = Calendar({
    DOM,
    props: xs.of(new Date())
      .remember()
      .map(date => ({
        value: date,
        monthNames: monthNames(),
        dayNames: dayNames(),
        start: 1
      }))
  })

  const vdom$ = xs.combine(calendar.DOM, calendar.value)
    .map(([calendarVDom, calendarValue]) =>
      div([
        calendarVDom,
        div(`Selected: ${calendarValue.toString()}`)
      ])
    )

  return {
    DOM: vdom$
  }
}

run(main, {
  DOM: makeDOMDriver('#app')
})
