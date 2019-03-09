import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class Profile extends Component {
constructor(props) {
    super(props)
}

  render() {
    return (
      <div id = 'profile-menu'>
        <div id = 'profile'>
          <div>
            <div id = 'top-username'>{this.props.userName}</div>
            <div id = 'top-cash'>{this.props.cash}<b>$</b></div>
          </div>
          <div id = 'top-avatar'>

          </div>
        </div>
        <ul id = 'touchBar'>
          <li><Link to = '/balance'>ПОПОЛНИТЬ БАЛАНС</Link></li>
          <li><Link to = ''>НАСТРОЙКИ</Link></li>
          <li><Link to = '' onClick = {() => sessionStorage.clear()}>ВЫЙТИ</Link></li>
        </ul>
      </div>
    )
  }
}

export default Profile