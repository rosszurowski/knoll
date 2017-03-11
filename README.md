# Knoll [![Build Status](https://travis-ci.org/rosszurowski/knoll.svg?branch=master)](https://travis-ci.org/rosszurowski/knoll)

A simple, fast, and un-opinionated table component for React.

It is small (900 bytes after gzip) and has no dependencies.

## Installation

```
npm install --save knoll
```

## Usage

```jsx
import React from 'react'
import { Table, Column } from 'knoll'

const data = [
  { id: 1, name: 'Birch', kind: 'coniferous', image: 'http...' },
  { id: 2, name: 'Oak', kind: 'deciduous', image: 'http...' },
  { id: 3, name: 'Maple', kind: 'deciduous', image: 'http...' },
  { id: 4, name: 'Fir', kind: 'coniferous', image: 'http...' }
]

function CustomTable () {
  return (
    <Table data={data}>
      {/* You can define a column's content with a function, returning a string, number, or set of elements */}
      <Column header="Order" cell={row => row.id} />
      <Column header="Image" cell={row => <img src={row.image} alt={row.name} />} />
      {/* You can also use the `cellKey` prop as a shorthand to get a property */}
      <Column header="Name" cellKey="name" />
      <Column header="Kind" cellKey="kind" />
    </Table>
  )
}
```

### Table

The component for configuration and passing the data. It accepts a few props:

* `data`: an array of data to render through the table
* `className`: CSS class for `table`
* `rowClassName`: CSS class for `tr`
* `headerCellClassName`: CSS class for `th`
* `cellClassName`: CSS class for `td`

### Column

Component for specifying the order and formatting of your data.

Columns have two main props: `header`, `cell`. These props accept strings, functions, or other React components, letting you customize how your content looks.

```jsx
const data = [
  { id: 5, name: "Mies van der Rohe", phoneNumber: '6505551234' },
  { id: 6, name: "Florence Knoll", phoneNumber: '6505559123' },
  { id: 7, name: "Harry Bertoia", phoneNumber: '6505555678' }
]

<Table data={data}>
  <Column header="ID" cell={row => `#${row.id}`} />
  <Column header="Phone Number" cell={row => formatPhoneNumber(row.phoneNumber)} />
  <Column header="Name" cell={row => row.name} />
</Table>
```

Would output a table like this:

ID | Phone Number  | Name
---|---------------|-------
#5  | +650 555-1234 | Mies van der Rohe
#6  | +650 555-9123 | Florence Knoll
#7  | +650 555-5678 | Harry Bertoia

#### `cellKey` shorthand

Since tables often show properties directly from an object, `Column` components accept a `cellKey` prop to make this easier.

Passing `cellKey="propName"` is shorthand for `cell={row => row.propName}`. Like so:

```jsx
const data = [
  { id: 5, name: "Mies van der Rohe", phoneNumber: '650 555 1234' },
  { id: 6, name: "Florence Knoll", phoneNumber: '650 555 9123' },
  { id: 7, name: "Harry Bertoia", phoneNumber: '650 555 5678' }
]

<Table data={data}>
  <Column header="ID" cellKey="id" />
  <Column header="Phone Number" cellKey="phoneNumber" />
  <Column header="Name" cellKey="name" />
</Table>
```

`cellKey` does not currently support nested properties (eg. `obj.a.b.c`). If you need to access nested properties, we recommend you use `cell` instead.

## Motivation

Showing tabular data on the web has been a solved problem since 1997. But recent React components for tables make it quite heavy-handed. Knoll tries to provide a simple, composable, and elegant interface to building reactive tables.

A few future plans:

- [ ] Examples of using composition for searching, filtering, sorting
- [ ] Examples of styling interior HTML components
- [ ] Better documentation
- [ ] Better test coverage

## License

MIT
