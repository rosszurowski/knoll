
import React, { PropTypes } from 'react'

export default function Table (props) {
  const {
    className,
    children,
    data,
    rowClassName,
    headerCellClassName,
    cellClassName
  } = props

  const columns = React.Children.toArray(children)
  const hasCells = columns.some(child => Boolean(child.props.cell))
  const hasHeaders = columns.some(child => Boolean(child.props.header))

  return (
    <table className={className}>
      {hasHeaders && (
        <thead>
          <tr className={rowClassName}>
            {React.Children.map(children, (child, index) => (
              <th className={headerCellClassName} key={index}>{maybeCall(child.props.header)}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {hasCells && (
          data.map((row, rowIndex) => (
            <tr className={rowClassName} key={rowIndex}>
              {React.Children.map(children, (child, index) => (
                <td className={cellClassName} key={index}>{maybeCall(child.props.cell, row)}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  cellClassName: PropTypes.string,
  data: PropTypes.array.isRequired,
  headerCellClassName: PropTypes.string,
  rowClassName: PropTypes.string
}

function maybeCall (fn, ...args) {
  return typeof fn === 'function' ? fn(...args) : fn
}
