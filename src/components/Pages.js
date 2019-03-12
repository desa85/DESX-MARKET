import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Pages extends Component {
  constructor(props) {
    super(props)
    this.currentPage = +this.props.currentPage
  }

  range() {
    return Array(this.props.count).fill(0).map((x, i) => i + 1)
  }

  viewPages(currentMark, pages) {
    const pagesOutput = [currentMark - 1, currentMark, currentMark +1].filter(item => (item > 1 && item < pages))
    const isLeftEdge = pagesOutput[0] > 2
    const isRightEdge = pagesOutput[pagesOutput.length - 1] < pages - 1
    const space = '...'

    return [1, !!isLeftEdge && space,  ...pagesOutput, !!isRightEdge && space, pages].filter(item => item)
  }

  render() {
    const countPages = Math.ceil(this.props.datasLen / this.props.contentСoverage)
    const currentPage = (+this.props.currentPage > countPages || +this.props.currentPage < 1) ? 1 : +this.props.currentPage

    return ((countPages > 1) &&
      <div id = 'pages'>
        {this.viewPages(currentPage, countPages).map(page => <Link to = {`${this.props.path}/${page}`} id = {(page === currentPage) ? 'activePage' : ''}>{page}</Link>)}
      </div>
    )
  }
}

export default Pages