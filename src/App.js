import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom'
import Main from './components/Main.js'
import Login from './components/Login.js'
import Shop from './components/Shop.js'
import DataBase from './data/db.js'

let users = new DataBase('users', 'login', 'money')

users.generateFakeUsers()

class App extends Component {

    constructor(props) {
        super(props)
        this.user = users.getData(sessionStorage['login']) || false
        this.state = {
            user: this.user
        }
    }

    render() {

        const updateUser = (props) => {
            this.setState({user: users.getData(sessionStorage['login']) || false})
        }

        const login = (props) => {
            return (
                <Login dataOfUsers = {users} user = {this.state.user} updateUser = {updateUser} />
            )
        }
        
        const shop = (props) => {
            return (
                <Shop user = {this.state.user} />
            )
        }

        return (
            <Router>
               <div>
                    <div id = 'shadow'></div>
                    <Route exact path = '/' component = {Main} />
                    <Route path = '/shop' render = {shop} />
                    <Route path = '/login' render = {login} />
                </div>
            </Router>
        )
    }
}

export default App