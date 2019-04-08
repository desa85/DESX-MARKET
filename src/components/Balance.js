import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import Money from './Money'

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
        this.props.db.user.addMoney(cash)
        this.setState({action: SUCCESS})
        this.props.db.updateUser()
      } else {
        this.setState({action: ERROR, err: 'Нельзя пополнять больше 1000', input: ''})
      }
    } else {
        this.setState({action: ERROR, err: 'Невалидные данные', input: ''})
      } 
    }

  render() {
    const norm = (
      <form className = "balance-window">
        <div>{'Ваш баланс:'}</div>
        <Money money = {(this.props.user && this.props.user.money)} />
        <input className = 'balance-window__input' value = {this.state.input} onChange = {(e) => {this.setState({input: e.target.value})}}/>
        <button className = "balance-window__button" onClick = {(e) => this.clickButton(e)}>Пополнить баланс</button>
      </form>
    )

    const success = (
      <div className = 'message-window'>
        <h1 >Успех! Баланс пополнен</h1>
        <h2 className = 'black-message' >  +{this.state.input}<span className = 'money'></span></h2>
        <form id = 'authorization-form'>
          <Link to = "/shop"><button id = 'button-login'  className = "button" >ок</button> </Link>
        </form>
      </div>
    )

    const error = (
      <div className = 'message-window'>
        <h1 id = 'headline-login'>Неудача</h1>
        <h2 className = 'black-message' >  {this.state.err}</h2>
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
            <div id = "content">
              {render()}
            </div>
          <Footer />
        </div>)

  }
}

export default Balance 