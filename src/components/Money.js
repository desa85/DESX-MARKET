import React, {Component} from 'react'
class Money extends Component {

  render() {
    return (
      <div 
        className = {this.props.className} 
        id = {this.props.className}
        style = { {flexDirection: "row"} }
      >
        <div style = { {display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70%'} }>{this.props.money}</div>
        <span className = 'money'></span>
      </div>
    )
  }
}

export default Money