
import { PropTypes } from 'react'

const Column = () => null

Column.propTypes = {
  cell: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  cellKey: PropTypes.string,
  header: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
}

export const getColumnProps = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { cell, cellKey, header, ...rest } = props
  return rest
}

export default Column
