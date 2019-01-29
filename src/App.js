import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom'
import Main from './components/Main.js'
import Login from './components/Login.js'
import Shop from './components/Shop.js'
import UserDatabase from './data/UserDatabase.js'

let userDb = new UserDatabase()

userDb.generateFakeUsers()

class App extends Component {

    constructor(props) {
        super(props)
        this.user = userDb.getCurrentUser()
        this.state = {
            user: this.user
        }
    }

    render() {

        const updateUser = (props) => this.setState({user: userDb.getCurrentUser()})
        const login = (props) => <Login dataOfUsers = {userDb} user = {this.state.user} updateUser = {updateUser} />        
        const shop = (props) => <Shop user = {this.state.user} users = {userDb} />
        const main = (props) => <Main user = {userDb} />

        return (
            <Router>
               <div>
                    <div id = 'shadow'></div>
                    <Route exact path = '/' render = {main} />
                    <Route path = '/shop' render = {shop} />
                    <Route path = '/login' render = {login} />
                </div>
            </Router>
        )
    }
}

export default App