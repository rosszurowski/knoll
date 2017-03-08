/* global React */

const { Component } = React

const withPagination = () => WrappedComponent => (
  class PaginatedTable extends Component {
    state = {
      currentPage: 0,
      pageCount: 0,
    }

    componentWillMount () {
      this.setState({
        currentPage: this.props.defaultPage,
      })
    }

    nextPage = () => {
      const { currentPage, pageCount } = this.state

      if (currentPage < pageCount - 1) {
        this.setState({
          currentPage: currentPage + 1,
        })
      }
    }

    previousPage = () => {
      const { currentPage } = this.state

      if (currentPage > 0) {
        this.setState({
          currentPage: currentPage - 1,
        })
      }
    }

    render () {
      const { data, pageSize, ...props } = this.props
      const { currentPage, pageCount } = this.state

      const startIndex = pageSize * currentPage
      const endIndex = pageSize * (currentPage + 1)

      const pagedData = data.slice(startIndex, endIndex)

      const canPagePrev = currentPage > 0
      const canPageNext = currentPage < pageCount - 1

      return (
        <div>
          <WrappedComponent data={pagedData} {...props} />
          <div>
            <a disabled={!canPagePrev} onClick={this.previousPage}>Prev</a>
            <a disabled={!canPageNext} onClick={this.nextPage}>Next</a>
          </div>
        </div>
      )
    }
  }
)

export default withPagination
