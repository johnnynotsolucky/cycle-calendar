import xs from 'xstream'
import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import { div } from '@cycle/dom'
import Calendar from '../src'
import '../src/styles.styl'
import './main.styl'

const monthNames = () => ([
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
])

const dayNames = () => (['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])

const main = ({ DOM }) => {
  const calendar = Calendar({
    DOM,
    props: xs.of({
        value: new Date(),
        monthNames: monthNames(),
        dayNames: dayNames(),
        start: 1
      })
      .remember()
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
