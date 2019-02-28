import Balance from '../src/components/Balance'
import Authorization from '../src/components/Authorization.js'
import Profile from '../src/components/Profile.js'
import UserDatabase from '../src/data/UserDatabase.js'
import ItemDatabase from '../src/data/ItemDatabase.js'
import UserItemDatabase from '../src/data/UserItemDatabase.js'
import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

describe('Тестирование баланса', () => {

    let wrapper
    let userDb
    let updateUser
    let profile
    let profileCreate
    let authorization
    let check

    beforeEach(() => {
        userDb = new UserDatabase()
        const itemDb = new ItemDatabase()

        let FakeUserIds = userDb.generateFakeUsers()
        itemDb.generateItems()

        let userItemDb = new UserItemDatabase(userDb, itemDb)
        userItemDb.presentAllUsers(FakeUserIds)
        
        updateUser = () => {
            wrapper.setState({user: userDb.getCurrentUser()})
        }

        userDb.generateFakeUsers()
        wrapper = shallow(<Balance user = {userDb.getCurrentUser()} users = {userDb} updateUser = {updateUser} />)
        authorization = shallow(<Authorization user = {userDb.getCurrentUser()} dataOfUsers = {userDb} userItemDb = {userItemDb} updateUser = {updateUser} />)
        profile = shallow(<Profile userName = {0} cash = {0} />)
        
        profileCreate = (userName, cash) => shallow(<Profile userName = {userName} cash = {cash} />)

        authorization.find('input').simulate('change', { target: {value: 'Lexa_555'} })
        authorization.find('#button-login').simulate('click', { preventDefault() {} })
        wrapper = shallow(<Balance user = {userDb.getCurrentUser()} users = {userDb} updateUser = {updateUser} />)

        check = (value) => {
            wrapper.find('input').simulate('change', {
                target: {value: value}
            })
            wrapper.find('button').simulate('click', { preventDefault() {} })
            let err = wrapper.find('.black-message').text()
            err =  err.replace(/^\s*|\s*$/g, '')
            wrapper.find('button').simulate('click', { preventDefault() {} })
            if (wrapper.state().action === 'success') wrapper.setState({action: 'normal'})
            return err
        }
        
    })

    it('Ввод невалидных данных', () => {
        let err

        err = check('')
        expect(err).toEqual('Невалидные данные')

        err = check('100.854')
        expect(err).toEqual('Невалидные данные')

        err = check('200..35')
        expect(err).toEqual('Невалидные данные')

        err = check('156,8')
        expect(err).toEqual('Невалидные данные')

        err = check('1001')
        expect(err).toEqual('Нельзя пополнять больше 1000')

        err = check('1000.01')
        expect(err).toEqual('Нельзя пополнять больше 1000')

    })

    it('Ввод валидных данных', () => {
        let err
        let value

        value = '1'
        err = check(value)
        expect(err).toEqual(`+${value}р`)

        value = '10'
        err = check(value)
        expect(err).toEqual(`+${value}р`)

        value = '100'
        err = check(value)
        expect(err).toEqual(`+${value}р`)

        value = '1000'
        err = check(value)
        expect(err).toEqual(`+${value}р`)

        value = '1.1'
        err = check(value)
        expect(err).toEqual(`+${value}р`)

        value = '100.22'
        err = check(value)
        expect(err).toEqual(`+${value}р`)

        const user = userDb.getCurrentUser()
        const profile = profileCreate(user.login, user.money) 
        const cash = '' + profile.find('#top-cash').props().children[0]
        
        expect(cash).toEqual('1312.32')
    })
})

