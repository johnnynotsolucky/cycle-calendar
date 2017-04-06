import xs from 'xstream'
import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import { div } from '@cycle/dom'
import Calendar from '../lib'
import { monthNames, dayNames } from '../lib/utils'
import './styles.styl'

const main = ({ DOM: DOM$ }) => {
  const calendar = Calendar({
    DOM: DOM$,
    props: xs.of({
      value: new Date(2017, 3, 9),
      monthNames: monthNames(),
      dayNames: dayNames(),
      start: 2
    })
  })

  const vdom$ = xs.combine(calendar.DOM, calendar.value)
    .map(([calendarVDom, calendarValue]) =>
      div([
        calendarVDom,
        div(calendarValue.toString())
      ])
    )

  return {
    DOM: vdom$
  }
}

run(main, {
  DOM: makeDOMDriver('#app')
})
