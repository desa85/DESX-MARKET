import React, { Component } from 'react'

class Modal extends Component {
  render () {
    return (
      !this.props.view ?
      <div></div> :
      <div className = 'shadow' onClick = {e => e.target.className === 'shadow' && this.props.toggle()}>
        {this.props.children}
      </div>
    )
  }
}

export default Modal