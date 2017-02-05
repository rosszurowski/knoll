
import React, { PropTypes } from 'react'
import Cell from './cell'

export default function Row (props) {
  const { columns, cellClassName, data, index: rowIndex, ...remainingProps } = props

  return (
    <tr {...remainingProps}>
      {columns.map((column, index) => (
        <Cell
          className={cellClassName}
          column={column}
          data={data}
          key={index}
          rowIndex={rowIndex} />
      ))}
    </tr>
  )
}

Row.propTypes = {
  cellClassName: PropTypes.string,
  columns: PropTypes.array.isRequired,
  data: PropTypes.any,
  index: PropTypes.number,
}
