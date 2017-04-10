const indexF = (_, i) => i

const sequentialArray = (f, n) => Array.from(new Array(n), f)

const shift = (arr, start) => (_, i) => arr[(start + i) % arr.length]

const trace = tag => (x) => {
  console.log(tag, x)
  return x
}

export {
  indexF,
  sequentialArray,
  shift,
  trace
}
