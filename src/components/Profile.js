import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class Profile extends Component {
constructor(props) {
    super(props)
}

  render() {
    return (
      <div>
        <div id = 'profile'>
          <div>
            <div id = 'profile__username'>{this.props.userName}</div>
            <div id = 'profile__cash'>{this.props.cash}</div>
          </div>
          <div id = 'profile__avatar'>

          </div>
        </div>
        <ul className = 'dropdown'>
          <li><Link to = '/balance' className = 'dropDown__a'>ПОПОЛНИТЬ БАЛАНС</Link></li>
          <li><Link to = '' className = 'dropDown__a'>НАСТРОЙКИ</Link></li>
          <li><Link to = '' className = 'dropDown__a' onClick = {() => sessionStorage.clear()}>ВЫЙТИ</Link></li>
        </ul>
      </div>
    )
  }
}

export default Profile