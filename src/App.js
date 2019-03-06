import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom'
import Main from './components/Main.js'
import Login from './components/Login.js'
import Shop from './components/Shop.js'
import UserDatabase from './data/UserDatabase.js'
import ItemDatabase from './data/ItemDatabase.js'
import UserItemDatabase from './data/UserItemDatabase.js'
import Order from './data/OrderDatabase.js'
import Balance from './components/Balance.js'
import Inventory from './components/Inventory.js'
import Users from './components/Users.js'


const userDb = new UserDatabase()
const itemDb = new ItemDatabase()

const FakeUserIds = userDb.generateFakeUsers()
itemDb.generateItems()

const userItemDb = new UserItemDatabase(userDb, itemDb)
userItemDb.presentAllUsers(FakeUserIds)

const OrderDb = new Order(userItemDb)

class App extends Component {

  constructor(props) {
    super(props)
    this.db = {
      user: userDb,
      item: itemDb,
      userItem: userItemDb,
      order: OrderDb,
      updateUser: () => this.updateUser()
    }
    this.user = this.db.user.getCurrentUser()
    this.state = {
      user: this.user
    }
  }

  updateUser() {
      this.setState({user: this.db.user.getCurrentUser()})
  }


  render() {

    const main = (props) => <Main user = {userDb} />
    const login = (props) => <Login db = {this.db} />        
    const shop = (props) => <Shop user = {this.state.user} db = {this.db} />
    const balance = (props) => <Balance user = {this.state.user} db = {this.db} />
    const inventory = (props) => <Inventory user = {this.state.user} db = {this.db} />
    const users = (props) => <Users user = {this.state.user} db = {this.db} />

    return (
      <Router>
        <div>
          <div className = 'shadow'></div>
          <button onClick = {() => sessionStorage.clear()}>выход</button>
          <Route exact path = '/' render = {main} />
          <Route path = '/shop' render = {shop} />
          <Route path = '/inventory' render = {inventory} />
          <Route path = '/balance' render = {balance} />
          <Route path = '/login' render = {login} />
          <Route path = '/users' render = {users} />
        </div>
      </Router>
    )
  }
}

export default App