import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import Money from './Money'

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
            <Money id = 'profile__cash' money = {this.props.cash} />
          </div>
          <div id = 'profile__avatar'>

          </div>
        </div>
        <ul className = 'dropdown'>
          <li><Link to = '/balance' className = 'dropdown__a'>ПОПОЛНИТЬ БАЛАНС</Link></li>
          <li><Link to = '' className = 'dropdown__a'>НАСТРОЙКИ</Link></li>
          <li><Link to = '' className = 'dropdown__a' onClick = {() => sessionStorage.clear()}>ВЫЙТИ</Link></li>
        </ul>
      </div>
    )
  }
}

export default Profile