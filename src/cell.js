
import React from 'react'
import PropTypes from 'prop-types'
import maybeCall from './helpers/maybe-call'

export default function Cell (props) {
  const { column, component: TableCell, data, isHeader, rowIndex, ...rest } = props
  const { cellKey, cell: cellValue, header: headerValue } = column.props

  let value

  if (isHeader) {
    value = maybeCall(headerValue, data, rowIndex)
  } else {
    value = typeof cellKey !== 'undefined'
      ? data[cellKey]
      : maybeCall(cellValue, data, rowIndex)
  }

  return (
    <TableCell {...rest}>{value}</TableCell>
  )
}

Cell.propTypes = {
  column: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  data: PropTypes.any.isRequired,
  isHeader: PropTypes.bool,
}

Cell.defaultProps = {
  isHeader: false,
}
