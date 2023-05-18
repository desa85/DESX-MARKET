import React, {Component} from 'react'
import Authorization from './Authorization.js' 

class Login extends Component {
  render() {
    return (
      <div>
        <h1>Добро пожаловать</h1>
        <Authorization db = {this.props.db} />
        {window.Telegram.WebApp.initData && <div style={{display: "flex", justifyContent: "center", margin: "30px", flexDirection: "column"}}>
          <div>Кстати, у тебя проблемы, я знаю как тебя зовут</div>
          <h1> {window.Telegram.WebApp.initDataUnsafe.user.first_name} {window.Telegram.WebApp.initDataUnsafe.user.second_name}</h1>
        </div>}
      </div>
    )
  }
}

export default Login