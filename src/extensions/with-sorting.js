import React, { Component } from 'react'

const withSorting = opts => WrappedComponent => (
  class SortableTable extends Component {
    render () {
      const { ...props } = this.props

      return (
        <WrappedComponent {...props} />
      )
    }
  }
)

export default withSorting
