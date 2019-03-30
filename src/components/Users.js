import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import User from './User.js'
import Pages from './Pages.js'
import Paginator from './Paginator.js'

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginFilter: '',
      moneyFilterFrom: '',
      moneyFilterTo: '',
      sortBy: this.props.db.user.CREATED
    }
  }

  render() {

    const typeSort =  {
      byDate: this.props.db.user.CREATED,
      byNumber: this.props.db.user.MONEY,
      byString: this.props.db.user.LOGIN
    }
    const loginFilter = {
      type: this.props.db.user.FILTER_SEARCH,
      value: this.state.loginFilter
    }
    const moneyFilter = {
      type: this.props.db.user.FILTER_FROM_TO,
      from: this.state.moneyFilterFrom,
      to: this.state.moneyFilterTo

    }
    const users = this.props.db.user.filteredData({
      filters: {
        login: loginFilter, 
        money: moneyFilter
      },
      sortBy: this.state.sortBy
    }).map(user => <User userImgPath = {5} userName = {user.login} cash = {user.money} />)

      return (
        !this.props.db.user.getCurrentUser() ?
        <Redirect to="/login" /> :
        <div>
          <Header user = {this.props.user} path = {Users.path} />
          <div id = 'content'>
            <Paginator page = {this.props.page} datas = {users} path = {Users.path}>
              <div>
                <div className = 'filter'>
                  <div>
                    <input placeholder = 'Ник' className = 'filter__input filter__input_full' value = {this.state.loginFilter} onChange = {e => this.setState({loginFilter: e.target.value})} />
                  </div>
                  <div>
                    <span>Баланс от</span>
                    <input placeholder = '0' className = 'filter__input' value = {this.state.moneyFilterFrom} onChange = {e => this.setState({moneyFilterFrom: e.target.value})} />
                  </div>
                  <div>
                    <span>до</span>
                    <input placeholder = '999' className = 'filter__input' value = {this.state.moneyFilterTo} onChange = {e => this.setState({moneyFilterTo: e.target.value})} />
                  </div>           
                </div>
                <div className = 'filter'>
                  <input type = 'radio' name = 'filter' id = {typeSort.byDate}  className = 'filter__radio' />
                  <label for = {typeSort.byDate} className = 'filter__button'>ПО ДАТЕ</label>
                  <input type = 'radio' name = 'filter' id = {typeSort.byString} className = 'filter__radio' />
                  <label for = {typeSort.byString} className = 'filter__button'>ПО НИКУ</label>
                  <input type = 'radio' name = 'filter' id = {typeSort.byNumber} className = 'filter__radio' />
                  <label for = {typeSort.byNumber} className = 'filter__button'>ПО БАЛАНСУ</label>
                </div>
              </div>
            </Paginator>
            </div>
          <Footer />
        </div>
    )
  }

  componentDidMount() {
    const radio = document.getElementsByClassName('filter__radio')
      for (let i = 0; i <= radio.length -1; i++) {
        radio[i].addEventListener('change', () => this.setState({sortBy: radio[i].id}))
      }
  }
}

Users.path = '/users'

export default Users
