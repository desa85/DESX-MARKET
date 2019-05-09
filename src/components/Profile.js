import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import Money from './Money'
import Modal from './Modal.js'
import ChoseAvatar from './ChoseAvatar.js'
import helper from '../helper.js'

class Profile extends Component {
  constructor(props) {
      super(props) 
      this.state = {
        modalView: false,
        selectedAvatar: this.props.db.user.getCurrentUser().avatar,
        inputName: '',
        errorMessage: '',
      }
  }

  isExistUser(name) {
    return !!this.props.db.user.getId(name)
  }

  fixPoint(value) {
    let user = this.props.db.user
    user.changeData(user.sessionUserId(), 'avatar', value)
  }

  chosePoint(value) {
    this.setState({selectedAvatar: value})
    return 1
  }

  toggleModalView() {
    this.setState({modalView: !this.state.modalView})
    this.setState( {inputName: ''} )
  }

  changeName(value) {
    const user = this.props.db.user.sessionUserId()
    this.props.db.user.changeData(user, 'login', value)
    this.props.db.updateUser()
  }

  click() {
    const NICK_VALIDATION_ERROR = 'Невалидные данные'
    const NICK_ALREADY_EXISTS_ERROR = 'Такой ник уже существует'
    let errorMessage = ''

    this.fixPoint(this.state.selectedAvatar)
    if(this.state.inputName) {
      this.state.errorMessage && this.setState( {errorMessage: ''} )
      !helper.validateString(this.state.inputName) && (errorMessage = NICK_VALIDATION_ERROR) ||
      this.isExistUser(this.state.inputName) && (errorMessage = NICK_ALREADY_EXISTS_ERROR)
      !errorMessage && this.changeName.bind(this)(this.state.inputName)
    }
    !errorMessage && this.toggleModalView()
    this.setState( {errorMessage: errorMessage} )
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
          <li>
            <Link to = '/balance' 
              className = 'dropdown__a'>
                ПОПОЛНИТЬ БАЛАНС
            </Link>
          </li>
          <li>
            <Link to = ''  
              className = 'dropdown__a' 
                onClick = { e => {e.preventDefault(); this.toggleModalView.bind(this)()} }>
              НАСТРОЙКИ
            </Link>
          </li>
          <li>
            <Link to = '' 
              className = 'dropdown__a'  onClick = {() => sessionStorage.clear()}>
              ВЫЙТИ
            </Link>
          </li>
        </ul>
        <Modal view = {this.state.modalView} toggle = {this.toggleModalView.bind(this)}>
          <div className = 'small-windiow'>
            <div className = 'small-windiow__header'>НАСТРОЙКИ</div>
            <ChoseAvatar 
              selectedAvatar = {this.state.selectedAvatar} 
              chose = {this.chosePoint.bind(this)} 
              className = 'small-windiow__avatars' 
            />
            <input 
              className = 'small-windiow__input' 
              placeholder = 'NAME' 
              value = {this.state.inputName}
              onChange = {e => this.setState( {inputName: e.target.value} )}
            />
            <div className = 'small-windiow__err-message'>{ this.state.errorMessage }</div>
            <button 
              className = {'small-windiow__button'} 
              onClick = {() => this.click.bind(this)()}>
              Сохранить
            </button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Profile