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
            open: true,
            errorMessage: false,
            isRedirect: false
        }
    }

    render() {
        function validateLogin(login) {
            let reg = /^[A-z0-9_.]+$/g
            let result = login.search(reg)
            return !!~result
        }

        const checkValidateLogin = () =>  {
            let users = this.props.dataOfUsers
            let login = this.state.login

            if (!validateLogin(login)) {
                this.setState({errorMessage: 'Невалидный формат данных'})
                return
            } 
            
            if (!users.search('login', login)) {
                users.addData(login, 100)
            }

            sessionStorage['login'] = users.search('login', login)
            this.setState({isRedirect: true})
        }

        const clickButton = (e) => {
            let users = this.props.dataOfUsers
            let login = this.state.login

            e.preventDefault() 
            checkValidateLogin() 
            this.props.updateUser()
            
        }

        var nana = () => {
            this.setState({open: !this.state.open})
        }

        return (
            this.state.isRedirect ? 
            <Redirect to = '/shop' /> :
            <div id = {this.state.open ? 'login-window' : 'login-window-close'}>
                <h1 id = 'headline-login'>ваш логин</h1>
                <form id = 'authorization-form'>
                    <div id = 'error-message' class = {this.state.errorMessage ? '' : 'visible'}>{this.state.errorMessage}</div>
                    <input id = 'input-login' placeholder = "login..." value = {this.state.login} onChange = {(e) => {this.setState({login: e.target.value})}} />
                    <button id = 'button-login' onClick = {clickButton}>войти</button>
                </form>
            </div>
        )
    }
}

export default Authorization