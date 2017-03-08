import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Table, Column } from 'knoll'
import { compose, withFilter, withPagination, withSorting } from 'knoll/extensions'

const ExtendedTable = compose(
  withFilter(['name', 'kind']),
  withPagination(),
  withSorting(),
)(Table)

const data = [
  { id: 1, name: 'Birch', kind: 'coniferous', image: 'http...' },
  { id: 2, name: 'Oak', kind: 'deciduous', image: 'http...' },
  { id: 3, name: 'Maple', kind: 'deciduous', image: 'http...' },
  { id: 4, name: 'Fir', kind: 'coniferous', image: 'http...' }
]

class App extends Component {
  render () {
    return (
      <ExtendedTable data={data}>
        <Column header="ID" cellKey="id" />
        <Column header="Name" cellKey="name" />
        <Column header="Kind" cellKey="kind" />
      </ExtendedTable>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
