import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import Money from './Money'
import Modal from './Modal.js'
import ChoseAvatar from './ChoseAvatar.js'

class Profile extends Component {
constructor(props) {
    super(props)
    this.state = {
      ModalView: false,
      avatar: this.props.db.user.getCurrentUser().avatar
    }
}

fixPoint(value) {
  let user = this.props.db.user
  user.changeData(user.sessionUserId(), 'avatar', value)
}

chosePoint(value) {
  this.setState({avatar: value})
  return 1
}

toggleModalView() {
  this.setState({ModalView: !this.state.ModalView})
}

  render() {
    return (
      <div>
        <div id = 'profile'>
          <div>
            <div id = 'profile__username'>{this.props.userName}</div>
            <Money id = 'profile__cash' money = {this.props.cash} />
          </div>
          <div id = 'profile__avatar' style = { {background: `url('/avatars/${+this.props.db.user.getCurrentUser().avatar}.jpg') 0% 0% / cover`} } >

          </div>
        </div>
        <ul className = 'dropdown'>
          <li><Link to = '/balance' className = 'dropdown__a'>ПОПОЛНИТЬ БАЛАНС</Link></li>
          <li><Link to = '' className = 'dropdown__a' onClick = { e => {e.preventDefault(); this.toggleModalView.bind(this)()} }>НАСТРОЙКИ</Link></li>
          <li><Link to = '' className = 'dropdown__a' onClick = {() => sessionStorage.clear()}>ВЫЙТИ</Link></li>
        </ul>
        <Modal view = {this.state.ModalView} toggle = {this.toggleModalView.bind(this)}>
          <div className = 'small-windiow'>
            <div className = 'small-windiow__header'>НАСТРОЙКИ</div>
            <ChoseAvatar avatar = {this.state.avatar} chose = {this.chosePoint.bind(this)} className = 'small-windiow__avatars' />
            <input className = 'small-windiow__input' placeholder = 'NAME' />
            <div className = 'small-windiow__err-message'>Такой ник уже существует</div>
            <button className = {'small-windiow__button'} onClick = {() => {this.fixPoint.bind(this)(this.state.avatar); this.toggleModalView.bind(this)()}}>Сохранить</button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Profile