
import React, { PropTypes } from 'react'
import Cell from './cell'

export default function Row (props) {
  const { columns, cellClassName, data, ...remainingProps } = props

  return (
    <tr {...remainingProps}>
      {columns.map((column, index) => (
        <Cell className={cellClassName} column={column} data={data} key={index} />
      ))}
    </tr>
  )
}

Row.propTypes = {
  cellClassName: PropTypes.string,
  columns: PropTypes.array.isRequired,
  data: PropTypes.any,
}
