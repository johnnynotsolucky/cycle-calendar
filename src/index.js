import xs from 'xstream'
import { div } from '@cycle/dom'
import model from './model'
import intent from './intent'
import view from './view'

const mapValue = state$ => props$ => props$
  .map(props => state$
    .map(([_, days]) => days.value)
    .startWith(props.value)
  )
  .flatten()

export default ({ DOM, props = xs.empty() }) => {
  const props$ = props.remember()
  const actions = intent(DOM, props$)
  const state$ = model(props$, actions)
  const vdom$ = view(props$, state$)

  const value$ = props$.compose(mapValue(state$))

  return {
    DOM: vdom$,
    value: value$
  }
}
