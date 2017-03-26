
import React, { PropTypes } from 'react'
import Cell from './cell'

export default function Row (props) {
  const {
    columns, component: TableRow, cellComponent,
    getCellProps, getRowProps, data,
    isHeader, index: rowIndex, ...rowProps
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
          {...getCellProps()} />
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
