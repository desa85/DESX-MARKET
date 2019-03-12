import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Pages extends Component {
  constructor(props) {
    super(props)
    this.mark = +this.props.mark
  }

  range() {
    return Array(this.props.count).fill(0).map((x, i) => i + 1)
  }

  pag(mark, pages) {
    const padding = [mark - 1, mark, mark +1]
    const result = padding.filter(item => (item > 1 && item < pages))
    const right = result[0] > 2 
    const left = result[result.length - 1] < pages - 1
    const space = '...'

    return [1, !!right && space,  ...result, !!left && space, pages].filter(item => item)
  }

  render() {
    let pages = Math.ceil(this.props.size / 6)
    let mark = (+this.props.mark > pages) ? 1 : +this.props.mark

    return ((pages > 1) &&
      <div id = 'pages'>
        {this.pag(mark, pages).map(page => <Link to = {`${this.props.path}/${page}`} id = {(page === mark) ? 'activePage' : ''}>{page}</Link>)}
      </div>
    )
  }
}

export default Pages