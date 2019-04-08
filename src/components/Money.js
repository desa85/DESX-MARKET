import React, {Component} from 'react'
class Money extends Component {

  render() {
    return <div className = {this.props.className} id = {this.props.className}>{this.props.money}<span className = 'money'></span></div>
  }
}

export default Money