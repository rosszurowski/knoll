
import React, { PropTypes } from 'react'
import maybeCall from './helpers/maybe-call'

export default function Cell (props) {
  const { column, data, ...rest } = props
  const { cellKey, cell } = column.props

  let value = cellKey
    ? data[cellKey]
    : maybeCall(cell, data)

  return (
    <td {...rest}>{value}</td>
  )
}

Cell.propTypes = {
  column: PropTypes.element.isRequired,
  data: PropTypes.any.isRequired
}
