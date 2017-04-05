import xs from 'xstream'
import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import main from '../lib'
import { monthNames, dayNames } from '../lib/utils'

run(main, {
  props: () => xs.of({
    value: new Date(2017, 3, 9),
    monthNames: monthNames(),
    dayNames: dayNames(),
    start: 1
  }),
  DOM: makeDOMDriver('#app')
});
