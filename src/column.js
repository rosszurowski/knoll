
import { PropTypes } from 'react'

const Column = props => null

Column.propTypes = {
  cell: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  cellKey: PropTypes.string,
  header: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
}

export default Column
