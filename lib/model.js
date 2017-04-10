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

const days = action$ =>
  action$
  .map(props => Object.assign({}, props, {
    monthStart: new Date(props.year, props.month).getDay(),
    monthEnd: new Date(props.year, props.month + 1, 0).getDate()
  }))
  .remember()

export default (props$, action) => ({
  header: header(props$, action.changeMonth),
  days: days(action.changeDay)
})
