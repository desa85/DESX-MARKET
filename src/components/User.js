import React, { Component } from 'react'
import Money from './Money'

class User extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className = 'user-block'>
        <div className = 'user-block__avatar'>
         <img src = {this.props.userImgPath} alt = '' />
        </div>
        <div className = 'user-block__name'>
          {this.props.userName}
        </div>
        <Money className = 'user-block__cash' money = {this.props.cash} />
          <button className = 'user-block__button' >Инвентарь</button>
      </div>
    )
  }
}

export default User
