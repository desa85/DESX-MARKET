import React, {Component} from 'react'
import { Redirect, Router, Route } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import Pages from './Pages'
import Order from './Order'
import Paginator from './Paginator'

class Shop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModal: false,
      modalValue: {},
      loginFilter: '',
      moneyFilterFrom: '',
      moneyFilterTo: '',
      sortActive: this.props.db.user.SORT_BY_DATE
    }
  }

  items(actions) {
    return this.props.db.order.getItemsInventory(this.props.db.user.sessionUserId(), actions)
      .map(item => {
        return {name: item.name, iconPath: item.iconPath, price: item.price, orderId: item.orderId}
      })
  }

  toggleModal(values) {
      this.setState({
        isModal: !!values,
        modalValue: values || {}
      })
  }

  sortOut(sort){
    this.setState({
      sortActive: sort
    })
  }

  render() {
    const modal = (
      <div className = 'shadow foreground' onClick = {e => {if (e.target.className === 'shadow foreground') this.toggleModal.bind(this)()}} >
        <div className = 'modal-inventory'>
          <div className = 'modal-inventory-err'>
              <p>Недостаточно средств</p>
              <div>
                <p>Ваш Баланс: <span>{this.state.modalValue.userBalance}</span></p>
                <p>Стоимость предмета: <span>{this.state.modalValue.price}</span></p>
              </div>
              <p>Вам не хватает: <span>{this.state.modalValue.lacks}</span></p>
              <button className = 'input-form modal-inventory-button' onClick = {this.toggleModal.bind(this, false)}>ок</button>
          </div>
        </div>
      </div>
    )
    const sorts =  {
      byDate: this.props.db.user.SORT_BY_DATE,
      byNumber: this.props.db.user.SORT_BY_NUMBER,
      byString: this.props.db.user.SORT_BY_STRING
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
    const actions = {
      filters: {
        login: loginFilter, 
        price: moneyFilter
      },
      sorts: {
        created: this.state.sortActive === sorts.byDate && sorts.byDate,
        price: this.state.sortActive === sorts.byNumber && sorts.byNumber,
        login: this.state.sortActive === sorts.byString && sorts.byString
      }
    } 

    const orders = this.items(actions).map(item => <Order 
      db = {this.props.db} 
      userItemId = {item.userItemId} 
      name = {item.name} 
      img = {item.iconPath} 
      price = {item.price} 
      orderId = {item.orderId}
      toggleModal = {this.toggleModal.bind(this)}
    />)

    return (
      !this.props.db.user.getCurrentUser() ?
      <Redirect to="/login" /> :
      <div id = 'wrapper'>
      {this.state.isModal && modal}
        <div>
          <Header user = {this.props.user} path = {Shop.path} />
          {/*TODO refactoring (logic to database)*/}
          <Paginator datas = {orders} page = {this.props.page} path = {Shop.path}>
            <div id = 'contents'>
                <div id = 'search'>
                  <div>
                    <input placeholder = 'Предмет' className = 'input-form-search' value = {this.state.loginFilter} onChange = {e => this.setState({loginFilter: e.target.value})} />
                  </div>
                  <div>
                    <span>Цена от</span>
                    <input placeholder = '0' className = 'input-form-search' value = {this.state.moneyFilterFrom} onChange = {e => this.setState({moneyFilterFrom: e.target.value})} />
                  </div>
                  <div>
                    <span>до</span>
                    <input placeholder = '999' className = 'input-form-search' value = {this.state.moneyFilterTo} onChange = {e => this.setState({moneyFilterTo: e.target.value})} />
                  </div>
                    
                </div>
                <div id = 'filter'>
                  <input type = 'radio' name = 'filter' id = {sorts.byDate} className = 'filter-radio' />
                  <label for = {sorts.byDate} className = 'filter-button'>ПО ДАТЕ</label>
                  <input type = 'radio' name = 'filter' id = {sorts.byString} className = 'filter-radio' />
                  <label for = {sorts.byString} className = 'filter-button'>ПО НАЗВАНИЮ</label>
                  <input type = 'radio' name = 'filter' id = {sorts.byNumber} className = 'filter-radio' />
                  <label for = {sorts.byNumber} className = 'filter-button'>ПО ЦЕНЕ</label>
                </div>
                <div id = 'items'>
                </div>
            </div>
          </Paginator>
          <Footer />
        </div>
      </div>
  )
  }

  componentDidMount() {
    const radio = document.getElementsByClassName('filter-radio')
      for (let i = 0; i <= radio.length -1; i++) {
        radio[i].addEventListener('change', () => this.setState({sortActive: radio[i].id}))
      }
  }
}

Shop.path = '/shop'

export default Shop