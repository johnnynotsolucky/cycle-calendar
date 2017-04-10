import xs from 'xstream'
import { div } from '@cycle/dom'
import model from './model'
import intent from './intent'
import view from './view'

import './styles.styl'

export default ({ DOM, props: props$ = xs.empty() }) => {
  const action$ = intent(DOM, props$)
  const state = model(props$, action$)
  const vdom$ = view(props$, state)

  return {
    DOM: vdom$,
    value: state.days.map(dayState => dayState.value)
  }
}
