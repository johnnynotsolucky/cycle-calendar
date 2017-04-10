# cycle-calendar

## Usage

### Installation

```
npm install cycle-calendar
```

### Props

`cycle-calendar` requires the following props:

 - `value`: Initial date value
 - `start`: Day the calendar week starts on (Sunday == 0)
 - `monthNames`: An array of names for months
 - `dayNames`: An array of names for days

### Example

```
const calendar = Calendar({
  DOM,
  props: xs.of({
      value: new Date(),
      start: 1,
      monthNames: ['January', 'February', 'March', 'April', …],
      dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    })
    .remember()
})

return {
  DOM: xs.combine(calendar.DOM, calendar.value)
    .map(([vdom, value]) =>
      div([
        vdom,
        div(`Selected: ${value.toString()}`)
      ])
    )
}
```

## Development

### Demo

```
npm run dev
```

### Building

#### Node Module

```
make lib
```

Outputs transpiled js files to `lib`.

#### Browser Module

```
make dist
```

Outputs browserified and minified files to `dist`.
