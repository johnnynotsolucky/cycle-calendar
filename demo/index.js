import {run} from '@cycle/run'
import {div, makeDOMDriver} from '@cycle/dom'
import xs from 'xstream'

const main = (sources) => {
  return {
    DOM: xs.of(
      div()
    )
  }
}

const drivers = {
  DOM: makeDOMDriver('#app')
}

run(main, drivers)
