import React, { Component } from 'react'

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
        <div className = 'user-block__cash'>
          {`${this.props.cash}`}<span className = 'money'></span>
        </div>
          <button className = 'user-block__button' >Инвентарь</button>
      </div>
    )
  }
}

export default User
