import React, { Component } from 'react'
import Money from './Money'

class User extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className = 'user-block'>
        <div className = 'user-block__avatar' style = { {background: `url('/avatars/${this.props.userAvatar}.jpg') 0% 0% / cover`} }>
        </div>
        <div className = 'user-block__name'>
          {this.props.userName}
        </div>
        <Money className = 'user-block__cash' money = {this.props.cash} />
      </div>
    )
  }
}

export default User
