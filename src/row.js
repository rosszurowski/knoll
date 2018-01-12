
import React from 'react'
import PropTypes from 'prop-types'
import Cell from './cell'
import { getColumnProps } from './column'

export default function Row (props) {
  const {
    columns, component: TableRow, cellComponent,
    getCellProps, getRowProps, data,
    isHeader, index: rowIndex
  } = props

  return (
    <TableRow {...getRowProps(data, rowIndex)}>
      {columns.map((column, index) => (
        <Cell
          component={cellComponent}
          column={column}
          data={data}
          isHeader={isHeader}
          key={index}
          rowIndex={rowIndex}
          {...getCellProps()}
          {...getColumnProps(column.props)} />
      ))}
    </TableRow>
  )
}

Row.propTypes = {
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  columns: PropTypes.array.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  data: PropTypes.any.isRequired,
  getCellProps: PropTypes.func.isRequired,
  getRowProps: PropTypes.func.isRequired,
  index: PropTypes.number,
  isHeader: PropTypes.bool,
}

Row.defaultProps = {
  isHeader: false,
}
