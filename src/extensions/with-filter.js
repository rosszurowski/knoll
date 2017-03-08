import React, { Component, PropTypes } from 'react'

const defaults = {
  filter (data, predicate) {

  }
}

const withFilter = opts => WrappedComponent => {
  const { filter } = Object.assign({}, defaults, opts)

  return class FilterableTable extends Component {
    static propTypes = {
      data: PropTypes.array.isRequired,
    }

    state = {
      predicate: '',
    }

    handleSearchChange = (e) => {
      this.setState({ filter: e.target.value })
    }

    render () {
      const { data, ...props } = this.props
      const { predicate } = this.state

      const filteredData = filter(data, predicate)

      return (
        <div>
          <div>
            <input type="text" placeholder="Search..." onChange={this.handleSearchChange} />
          </div>
          <WrappedComponent data={filteredData} {...props} />
        </div>
      )
    }
  }
}

export default withFilter
