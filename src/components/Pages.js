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

  vievPages(currentMark, pages) {
    const pagesOutput = [currentMark - 1, currentMark, currentMark +1].filter(item => (item > 1 && item < pages))
    const isRightEdge = pagesOutput[0] > 2 
    const isLeftEdge = pagesOutput[pagesOutput.length - 1] < pages - 1
    const space = '...'

    return [1, !!isRightEdge && space,  ...pagesOutput, !!isLeftEdge && space, pages].filter(item => item)
  }

  render() {
    const pages = Math.ceil(this.props.size / this.props.contentСoverage)
    const mark = (+this.props.mark > pages || +this.props.mark < 1) ? 1 : +this.props.mark

    return ((pages > 1) &&
      <div id = 'pages'>
        {this.vievPages(mark, pages).map(page => <Link to = {`${this.props.path}/${page}`} id = {(page === mark) ? 'activePage' : ''}>{page}</Link>)}
      </div>
    )
  }
}

export default Pages