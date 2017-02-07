# Knoll [![Build Status](https://travis-ci.org/rosszurowski/knoll.svg?branch=master)](https://travis-ci.org/rosszurowski/knoll)

A simple, fast, and unopinionated table component for React.

## Installation

```
npm install --save knoll
```

## Usage

```jsx
import React, { Component } from 'react'
import Table, { Column } from 'knoll'

const data = [
  { id: 1, name: 'Birch', kind: 'coniferous', image: 'http...' },
  { id: 2, name: 'Oak', kind: 'deciduous', image: 'http...' },
  { id: 3, name: 'Maple', kind: 'deciduous', image: 'http...' },
  { id: 4, name: 'Fir', kind: 'coniferous', image: 'http...' }
]

export default class Example extends Component {
  render () {
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
}
```

### Table

The `Table` is the root component to which you pass the data and configure the table.

It accepts a few props:

* `data`: an array of data to render through the table
* `className`: CSS class for `table`
* `rowClassName`: CSS class for `tr`
* `headerCellClassName`: CSS class for `th`
* `cellClassName`: CSS class for `td`

### Column

The `Column` component is for you to specify the order and format of your data.

Columns can take three props: `header`, `cell`, or `cellKey`. Each of these props accept strings, functions, or other React components, letting you customize how your content looks.

```
// If each row looks like:

const data = [
  { id: 5, name: "Mies van der Rohe", phoneNumber: '6505551234' },
  { id: 6, name: "Florence Knoll", phoneNumber: '6505559123' },
  { id: 7, name: "Harry Bertoia", phoneNumber: '6505555678' }
]

<Table data={data}>
  <Column header="ID" cell={row => `#${row.id}`} />
  <Column header="Phone Number" cell={row => formatPhoneNumber(row.phoneNumber)} />
  <Column header="Name" cellKey="name" />
</Table>
```

Would output a table like this:

ID | Phone Number  | Name
---|---------------|-------
#5  | +650 555-1234 | Mies van der Rohe
#6  | +650 555-9123 | Florence Knoll
#7  | +650 555-5678 | Harry Bertoia

## Motivation

Showing tabular data on the web has been a solved problem since 1997. But recent React components trying to make it easy all come off heavy-handed. Knoll tries to provide a simple and composable interface to building reactive tables.

A few future plans:

- [ ] Examples of using composition for searching, filtering, sorting
- [ ] Examples of styling interior HTML components
- [ ] Better documentation
- [ ] Better test coverage

## License

MIT
