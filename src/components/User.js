import React, { Component } from 'react'

class User extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className = 'user-block'>
        <div className = 'userImg-block'>
	  <img src = {this.props.userImgPath} alt = '' />
	</div>
	<div className = 'userName-block'>
	  {this.props.userName}
	</div>
	<div className = 'cash-block'>
	  {`${this.props.cash}р`}
	</div>
	<button className = 'inventory-button-block' >Инвентарь</button>
      </div>
    )
  }
}

export default User
