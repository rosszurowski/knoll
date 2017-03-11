
import React, { PropTypes } from 'react'
import Cell from './cell'

export default function Row (props) {
  const {
    columns, component: TableRow, cellComponent, data,
    isHeader, index: rowIndex, onClick, ...rest,
  } = props

  let wrappedOnClick = onClick ? () => onClick(data) : undefined

  return (
    <TableRow onClick={wrappedOnClick} {...rest}>
      {columns.map((column, index) => (
        <Cell
          component={cellComponent}
          column={column}
          data={data}
          isHeader={isHeader}
          key={index}
          rowIndex={rowIndex} />
      ))}
    </TableRow>
  )
}

Row.propTypes = {
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  columns: PropTypes.array.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  data: PropTypes.any.isRequired,
  index: PropTypes.number,
  isHeader: PropTypes.bool,
  onClick: PropTypes.func,
}

Row.defaultProps = {
  isHeader: false,
}
