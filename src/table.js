
import React, { PropTypes } from 'react'
import Row from './row'

const defaultComponents = {
  table: 'table',
  header: 'thead',
  headerRow: 'tr',
  headerCell: 'th',
  body: 'tbody',
  row: 'tr',
  cell: 'td',
}

export default function Table (props) {
  const { children, data, components, ...rest } = props

  const {
    table: InternalTable,
    header: TableHeader,
    headerRow: TableHeaderRow,
    headerCell: TableHeaderCell,
    body: TableBody,
    row: TableRow,
    cell: TableCell,
  } = { ...defaultComponents, ...components }

  const columns = React.Children.toArray(children)
  const headers = columns.map(column => column.props.header)
  const hasCells = data.length > 0
  const hasHeaders = headers.some(Boolean)

  return (
    <InternalTable {...rest}>
      {hasHeaders && (
        <TableHeader>
          <Row
            component={TableHeaderRow}
            cellComponent={TableHeaderCell}
            columns={columns}
            data={headers}
            isHeader />
        </TableHeader>
      )}
      <TableBody>
        {hasCells && (
          data.map((rowData, rowIndex) => (
            <Row
              key={rowIndex}
              component={TableRow}
              cellComponent={TableCell}
              columns={columns}
              data={rowData}
              index={rowIndex} />
          ))
        )}
      </TableBody>
    </InternalTable>
  )
}

Table.propTypes = {
  components: PropTypes.shape({
    cell: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    header: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    headerRow: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    headerCell: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    row: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    table: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  }),
  data: PropTypes.array.isRequired,
}
