# Knoll [![Build Status](https://travis-ci.org/rosszurowski/knoll.svg?branch=master)](https://travis-ci.org/rosszurowski/knoll)

A simple, fast, and un-opinionated table component for React.

It is small (1kB gzipped, from 3kB) and has no dependencies.

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
      {/* Get a column's content via a function */}
      <Column header="Order" cell={row => row.id} />
      {/* Customize what renders with React elements */}
      <Column header="Image" cell={row => <img src={row.image} alt={row.name} />} />
      {/* You can also use the `cellKey` prop as a shorthand to get a property */}
      <Column header="Name" cellKey="name" />
      <Column header="Kind" cellKey="kind" />
    </Table>
  )
}
```

## API

### Table

The `Table` component is for configure the table and passing data. It accepts a few props:

* `data` - Array of data to render (required)
* `components` - Object of elements to render (optional, see [Styling](#styling))

You can render a `Table` by passing it one or many `Column` children:

```jsx
import { Table, Column } from 'knoll'

const fruit = [
  { name: 'Apple', quantity: 2 },
  { name: 'Banana', quantity: 5 },
  { name: 'Honeydew', quantity: 3 }, 
]

<Table data={fruit}>
  <Column header="Name" cellKey="name" />
  <Column header="Quantity" cellKey="quantity" />
</Table>
```

### Column

`Column` allows you to specify the order and rendering of your data. Columns accept these props:

* `header` - A variable to render as the header content
* `cell` - A variable to render as the cell content
* `cellKey` - An shorthand getter for objects ([see below](#cellkey-shorthand))

#### Showing data

The `header` and `cell` props accept strings, functions, or other React components, letting you customize how your content looks.

```jsx
import { Table, Column } from 'knoll'

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

_Note: `cellKey` does not currently support nested properties (eg. `obj.a.b.c`). If you need to access nested properties, we recommend you use `cell` instead._

## Styling

Knoll ships with no styling. It only renders HTML. There’s nothing worse than finding a good library, only to realize you need to override styles and ship unused code.

However, Knoll allows you to customize the HTML of every it renders via the `components` prop, like so:

```jsx
// Define what components you'd like to render.
// The default values are below.
const components = {
  table: 'table',
  tableHeader: 'thead',
  tableHeaderRow: 'tr',
  tableHeaderCell: 'th',
  tableBody: 'tbody',
  tableRow: 'tr',
  tableCell: 'td',
}

const DefaultTable = props => (
  <Table components={components} {...props} />
)
```

This approach means Knoll supports both [`className`-based styling](#traditional-css) (eg. plain CSS, CSS Modules), and [CSS-in-JS approaches](#css-in-js).

_Note: Be careful when moving to a `div`-based table, to define **all** the components. If you don’t React will render `th`/`tr`/`td` elements and throw “Invalid DOM Nesting” warnings._

#### Traditional CSS

Pass components in that add a `className`, be it a string of a CSS module class.

```jsx
const components = {
  table: props => <table className="CustomTable" {...props} />,
  tableHeader: props => <thead className="CustomTable-header" {...props} />,
  tableHeaderRow: props => <tr className="CustomTable-headerRow" {...props} />,
  tableHeaderCell: props => <th className="CustomTable-headerCell" {...props} />,
  tableBody: props => <tbody className="CustomTable-body" {...props} />,
  tableRow: props => <tr className="CustomTable-row" {...props} />,
  tableCell: <td className="CustomTable-cell" {...props} />,
}

const CustomTable = props => (
  <Table components={components} {...props} />
)
```

Look overly verbose? Use the flexility of JSX to help!

```jsx
const wrap = (Component, className) => props => <Component className={className} {...props} />

const components = {
  table: wrap('table', 'CustomTable'),
  tableHeader: wrap('thead', 'CustomTable-header'),
  tableHeaderRow: wrap('tr', 'CustomTable-headerRow'),
  tableHeaderCell: wrap('th', 'CustomTable-headerCell'),
  tableBody: wrap('tbody', 'CustomTable-body'),
  tableRow: wrap('tr', 'CustomTable-row'),
  tableCell: wrap('td', 'CustomTable-cell'),
}

const CustomTable = props => (
  <Table components={components} {...props} />
)
```

#### Integrating with external CSS

Being able to customize arbitrary elements means it’s easy to work with external CSS frameworks like [Bootstrap](https://v4-alpha.getbootstrap.com/content/tables/):

```jsx
const default = {
  table: props => <Table className="table" {...props} />,
}

const striped = {
  table: props => <Table className="table table-striped" {...props} />,
}

export const DefaultTable = props => <Table components={default} {...props} />
export const StripedTable = props => <Table components={striped} {...props} />

//
// Now, in other files, you can use Bootstrap's tables like so:
//

const data = [
  { foo: 'bar' },
  { foo: 'baz' },
  { foo: 'foobar' },
]

<DefaultTable data={data}>
  <Column header="This table is plain" cellKey="foo" />
</DefaultTable>

<StripedTable data={data}>
  <Column header="This table is striped" cellKey="foo" />
</StripedTable>
```

#### CSS-in-JS

It’s also easy to work with CSS-in-JS solutions. The example below uses [styled-components](https://github.com/styled-components/styled-components), but is easy to apply to other solutions.

```jsx
const components = {
 table: styled.table`
   color: #242424;
   font-size: 12px;
 `,
 tableHeader: styled.thead`
   font-weight: bold;
   Text-align: center;
 `,
}

const StyledTable = props => (
  <Table components={components} {...props} />
)
```


## Motivation

Showing tabular data on the web has been a solved problem since 1997. But recent React components for tables make it quite heavy-handed.

[React Table](https://github.com/tannerlinsley/react-table)  comes preloaded with styles, loading states, “pivoting” tables, and a lot of other stuff I don’t want. Other options have strange APIs and look abandoned.

Knoll tries to provide a simple, composable, and elegant interface to building reactive tables.

## TODO

A few future plans:

- [ ] Examples of using composition for searching, filtering, sorting
- [x] Examples of styling

## License

MIT
