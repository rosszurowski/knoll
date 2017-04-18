
import React, { PropTypes } from 'react'
import Row from './row'
import Column from './column'

const defaultPropGetter = () => ({})

const defaultComponents = {
  table: 'table',
  header: 'thead',
  headerRow: 'tr',
  headerCell: 'th',
  body: 'tbody',
  row: 'tr',
  cell: 'td',
}

const isColumnElement = child => child.type === Column

export default function Table (props) {
  const {
    children, data, components,
    getHeaderProps, getHeaderRowProps, getHeaderCellProps,
    getBodyProps, getRowProps, getCellProps, ...rest
  } = props

  const {
    table: InternalTable,
    header: TableHeader,
    headerRow: TableHeaderRow,
    headerCell: TableHeaderCell,
    body: TableBody,
    row: TableRow,
    cell: TableCell,
  } = { ...defaultComponents, ...components }

  const columns = React.Children.toArray(children).filter(isColumnElement)
  const headers = columns.map(column => column.props.header)
  const hasCells = data.length > 0
  const hasColumns = columns.length > 0
  const hasHeaders = headers.some(Boolean)

  return (
    <InternalTable {...rest}>
      {(hasHeaders && hasColumns) && (
        <TableHeader {...getHeaderProps()}>
          <Row
            component={TableHeaderRow}
            cellComponent={TableHeaderCell}
            columns={columns}
            data={headers}
            getCellProps={getHeaderCellProps}
            getRowProps={getHeaderRowProps}
            isHeader />
        </TableHeader>
      )}
      <TableBody {...getBodyProps()}>
        {(hasCells && hasColumns) && (
          data.map((rowData, rowIndex) => (
            <Row
              key={rowIndex}
              component={TableRow}
              cellComponent={TableCell}
              columns={columns}
              data={rowData}
              getCellProps={getCellProps}
              getRowProps={getRowProps}
              index={rowIndex} />
          ))
        )}
      </TableBody>
    </InternalTable>
  )
}

Table.propTypes = {
  components: PropTypes.shape({
    body: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    cell: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    header: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    headerRow: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    headerCell: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    row: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    table: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  }),
  data: PropTypes.array.isRequired,
  getBodyProps: PropTypes.func,
  getHeaderCellProps: PropTypes.func,
  getHeaderProps: PropTypes.func,
  getHeaderRowProps: PropTypes.func,
  getRowProps: PropTypes.func,
}

Table.defaultProps = {
  getBodyProps: defaultPropGetter,
  getHeaderCellProps: defaultPropGetter,
  getHeaderProps: defaultPropGetter,
  getHeaderRowProps: defaultPropGetter,
  getCellProps: defaultPropGetter,
  getRowProps: defaultPropGetter,
}
