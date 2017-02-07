
import { PropTypes } from 'react'

const Column = props => null

Column.propTypes = {
  cell: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  cellKey: PropTypes.string,
  header: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Column
