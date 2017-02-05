
import React, { PropTypes } from 'react'
import Row from './row'

import maybeCall from './helpers/maybe-call'

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
  const hasCells = data.length > 0
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
          data.map((rowData, rowIndex) => (
            <Row
              cellClassName={cellClassName}
              className={rowClassName}
              columns={columns}
              data={rowData}
              key={rowIndex} />
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
