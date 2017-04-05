const indexF = (_, i) => i

const sequentialArray = (f, n) => Array.from(new Array(n), f)

const shift = (arr, start) => (_, i) => arr[(start + i) % arr.length]

const join = (a, b) => ({ ...a, ...b })

const monthNames = () => ([
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
])

const dayNames = () => (['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])

const trace = tag => (x) => {
  console.log(tag, x)
  return x
}

export {
  indexF,
  sequentialArray,
  shift,
  join,
  monthNames,
  dayNames,
  trace
}
