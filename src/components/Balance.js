import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import Header from './Header'
import Footer from './Footer'

const NORMAL = "normal"
const SUCCESS = "success"
const ERROR = "error"

class Balance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      action: NORMAL,
      err: ''
    }
  }

  getCash(val) {
    const reg = /^[0-9]+(\.[0-9]{1,2})?$/i
    return val.match(reg) ? +val.match(reg)['input'] : null
  }

  cashValidate(val) { 
    return val <= 1000
  }

  clickButton(e) {
    e.preventDefault() 
    let cash = this.getCash(this.state.input)
    if (cash) {
      if(this.cashValidate(cash)) {
        this.props.users.addMoney(cash)
        this.setState({action: SUCCESS})
        this.props.updateUser()
      } else {
        this.setState({action: ERROR, err: 'Нельзя пополнять больше 1000', input: ''})
      }
    } else {
        this.setState({action: ERROR, err: 'Невалидные данные', input: ''})
      } 
    }

  render() {
    const norm = (
      <div id = "balance-window">
        <form>
          <div>{'Ваш баланс:\n' + (this.props.user && this.props.user.money)}</div>
          <input className = 'input-form' value = {this.state.input} onChange = {(e) => {this.setState({input: e.target.value})}}/>
          <button className = "button" onClick = {(e) => this.clickButton(e)}>Пополнить баланс</button>
        </form>
      </div>
    )

    const success = (
      <div id = 'login-window'>
        <h2 id = 'headline-login'>Успех! Баланс пополнен</h2>
        <h3 className = 'black-message' >  +{this.state.input}р</h3>
        <form id = 'authorization-form'>
          <Link to = "/shop"><button id = 'button-login'  className = "button" >ок</button> </Link>
        </form>
      </div>
    )

    const error = (
      <div id = 'login-window'>
        <h2 id = 'headline-login'>Неудача</h2>
        <h3 className = 'black-message' >  {this.state.err}</h3>
        <form id = 'authorization-form'>
          <button id = 'button-login'  className = "button" onClick = {e => {e.preventDefault(); this.setState({action: NORMAL})}}>ок</button>
        </form>
      </div>
    )

     const render = () => {
        switch(this.state.action) {
          case NORMAL: return norm;
          case SUCCESS: return success;
          case ERROR: return error;
        }
      } 

     return (!this.props.user ? 
        <Redirect to="/login" /> :
        <div id = 'wrapper'>
          <Header user = {this.props.user} />
            {render()}
          <Footer />
        </div>)

  }
}

export default Balance 