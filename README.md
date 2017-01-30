# Knoll

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
        <Column header="Order" cell={row => row.id} />
        <Column header="Image" cell={row => <img src={row.image} alt={row.name} />} />
        <Column header="Name" cell={row => row.name} />
        <Column header="Kind" cell={row => row.kind} />
      </Table>
    )
  }
}
```

Knoll provides the `Column` component for you to order and structure your data. You can specify two props: `header` and `cell`, which define how the head and body of the table look. These props accept strings, functions, or other React components, letting you customize how your content looks.

## Motivation

Showing tabular data on the web has been a solved problem since 1997. But recent React components trying to make it easy all come off heavy-handed. Knoll tries to provide a simple and composable interface to building reactive tables.

A few future plans:

- [ ] Examples of using composition for searching, filtering, sorting
- [ ] Examples of styling interior HTML components
- [ ] Better test coverage

## License

MIT
