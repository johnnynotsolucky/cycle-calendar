import xs from 'xstream'
import { addMonths } from './helpers'

const header = (props$, action$) =>
  props$
  .map(props => action$
    .fold((acc, x) => acc + x, 0)
    .map(value => ({
      monthNames: props.monthNames,
      date: addMonths(props.value, value)
    }))
  )
  .flatten()

const days = action$ => action$
  .map(action => Object.assign({}, action, {
    monthStart: new Date(action.year, action.month).getDay(),
    monthEnd: new Date(action.year, action.month + 1, 0).getDate()
  }))
  .remember()

export default (props$, actions) =>
  xs.combine(
    header(props$, actions.changeMonth),
    days(actions.changeDay)
  )
