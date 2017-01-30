
import { PropTypes } from 'react'

const Column = props => null

Column.propTypes = {
  cell: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  header: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
}

export default Column
