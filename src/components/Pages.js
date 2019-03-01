import React, { Component } from 'react'

class Pages extends Component {
  constructor(props) {
    super(props)
  }

  range() {
    return Array(this.props.count).fill(0).map((x, i) => i + 1)
  }

  render() {
    return (
      <div id = 'pages'>
        {this.range().map(page => <span>{page}</span>)}
      </div>
    )
  }
}

export default Pages