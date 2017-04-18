import xs from 'xstream'
import { addMonths } from './helpers'

const changeMonth = DOM =>
  xs.merge(
    DOM.select('.calendar-prev').events('click').mapTo(-1),
    DOM.select('.calendar-next').events('click').mapTo(1)
  )

const selectDay = (DOM, props$) =>
  xs.merge(
    DOM
    .select('.calendar-selectable.calendar-day:not(.calendar-empty)')
    .events('click')
    .map(({ target }) => {
      const [year, month, day] = target.dataset.date.split('-').map(Number)
      return new Date(year, month, day)
    }),
    props$.map(props => props.value)
  )

export default (DOM, props$) => {
  const changeMonth$ = changeMonth(DOM)
  const setProps = (start, value) =>
    change$ => change$
      .startWith(0)
      .fold((acc, x) => acc + x, 0)
      .map(change => {
        const date = addMonths(value, change)
        return {
          month: date.getMonth(),
          year: date.getFullYear(),
          value,
          start
        }
      })

  const value$ = selectDay(DOM, props$)
  const changeDay$ = props$
    .map(({ start }) => value$
      .map(value => changeMonth$
        .compose(setProps(start, value))
      )
      .flatten()
    )
    .flatten()

  return ({
    changeMonth: changeMonth$,
    changeDay: changeDay$,
    value: value$,
  })
}
