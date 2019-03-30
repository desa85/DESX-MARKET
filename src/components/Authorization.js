import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import Main from './Main.js'
import Shop from './Shop.js'
import { Route, Redirect } from 'react-router'

class Authorization extends Component {
  constructor(props) {
      super(props)
      this.state = {
      login: '',
      errorMessage: '',
      isRedirect: false
      }
  }

  render() {
    const db = this.props.db
    const validateLogin = (login) => {
      let reg = /^[A-z0-9_.]+$/g
      let result = login.search(reg)
      return !!~result
  }

  const checkValidateLogin = () =>  {
    const userDb = db.user
    const login = this.state.login

    if (!validateLogin(login)) {
      this.setState({errorMessage: 'Логин содержит запрещенные символы'})
      return
    } 
    
    if (!userDb.getId(login)) {
      const userId = userDb.insert(login, 100, new Date(Date.now())).id 
      db.userItem.present(userId)
    }

    userDb.updateCurrentUser(login) 
    this.setState({isRedirect: true})
  }

    const clickButton = (e) => {
      const userDb = db.user
      const login = this.state.login

      e.preventDefault() 
      checkValidateLogin() 
      db.updateUser()
        
    }

    return (
      this.state.isRedirect ? 
      <Redirect to = {Shop.path} /> :
        <form className = 'login-window'>
        <h1>Ваш логин</h1>
          <div className = 'login-window__error-message' class = {this.state.errorMessage ? '' : 'visible'}>{this.state.errorMessage}</div>
          <input className = 'login-window__input' placeholder = "login..." value = {this.state.login} onChange = {(e) => {this.setState({login: e.target.value})}} />
          <button className = 'login-window__button' onClick = {clickButton}>войти</button>
        </form>
    )
  }
}

export default Authorization