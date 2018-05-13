import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { 
  BrowserRouter as Router, Route, 
  Redirect, Switch, MemoryRouter 
} from 'react-router-dom'
import renderer from 'react-test-renderer'
import * as pwAction from './store/password/action.password'

import App from './App';
import Login from './components/Login'
import EditForm from './components/EditForm'
import Passwordlist from './components/Passwordlist'
import PasswordForm from './components/PasswordForm'
import Password from './components/Password'
import Register from './components/Register'
import store from './store'
import {getAllPassword} from './store/password/action.password'

Enzyme.configure({ adapter: new Adapter()})

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    const wrapper = mount(
      <Provider store={store}>
        <App user={{loginStatus: false}}/>
      </Provider>
    )
    ReactDOM.render(wrapper, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should have <Router />, <Switch /> and <Route />', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.containsAllMatchingElements([
      <Router />,
      <Switch />,
      <Route />
    ])).toHaveLength[5]
  })

  it('the first page should be Login', () => {
    const wrapper = mount(
      <Provider store={store}>
        <App user={{loginStatus: false}}/>
      </Provider>
    )
    expect(wrapper.containsMatchingElement(<Login />)).toBeTruthy()
    expect(wrapper.containsMatchingElement(<Passwordlist />)).toBeFalsy()
    // expect(wrapper.find('h2')).toBeTruthy()
  })
})

describe('store', () => {
  const wrapperStore = mount(
    <Provider store={store}>
      <Passwordlist/>
    </Provider>
  )
  it('passwordlist should mount data at start', () => {
    expect(wrapperStore.props().store.getState().password).toEqual({
      passwords: [],
      loading: true,
      error: false
    })
  })
})


describe('form password checked', () => {
  const wrapperForm = shallow(<PasswordForm/>, {context:{store}}).dive()
  it('PasswordForm should have form', () => {
    expect(wrapperForm.find('form')).toBeTruthy()
  })
  it('PasswordForm should have input', () => {
    expect(wrapperForm.find('input')).toHaveLength(8)
  })
  it('PasswordForm should have button Submit', () => {
    expect(wrapperForm.find('button').text()).toEqual('Submit')
  })
  it('fail check uppercase', () => {
    let pass = 'agrhaganteng'
    wrapperForm.find('input').at(3).simulate('change', {
      target: {
        name: 'password',
        value: pass
      }
    })
    wrapperForm.find('form').at(0).simulate('submit', {preventDefault() {}})
    expect(wrapperForm.find('#labelUpper').at(0).text()).toMatch("at least one uppercase letter?")
  })
  it('fail check lowercase', () => {
    let pass = 'AGRHA123'
    wrapperForm.find('input').at(3).simulate('change', {
      target: {
        name: 'password',
        value: pass
      }
    })
    wrapperForm.find('form').at(0).simulate('submit', {preventDefault() {}})
    expect(wrapperForm.find('#labelLower').at(0).text()).toMatch("at least one lowercase letter?")
  })
  it('fail check number', () => {
    let pass = 'agrhaganteng'
    wrapperForm.find('input').at(3).simulate('change', {
      target: {
        name: 'password',
        value: pass
      }
    })
    wrapperForm.find('form').at(0).simulate('submit', {preventDefault() {}})
    expect(wrapperForm.find('#labelNumber').at(0).text()).toMatch("at least one number?")
  })
  it('fail check special character', () => {
    let pass = 'agrhaganteng'
    wrapperForm.find('input').at(3).simulate('change', {
      target: {
        name: 'password',
        value: pass
      }
    })
    wrapperForm.find('form').at(0).simulate('submit', {preventDefault() {}})
    expect(wrapperForm.find('#labelSpecial').at(0).text()).toMatch("at least one symbol?")
  })
  it('fail check password length', () => {
    let pass = 'agra'
    wrapperForm.find('input').at(3).simulate('change', {
      target: {
        name: 'password',
        value: pass
      }
    })
    wrapperForm.find('form').at(0).simulate('submit', {preventDefault() {}})
    expect(wrapperForm.find('#labelLength').at(0).text()).toMatch("minimal 5 letter length?")
  })
})


describe('EditForm checked', () => {
  const wrapperEdit = shallow(<EditForm/>, {context:{store}})
  it('editPassword should have form', () => {
    expect(wrapperEdit.find('form')).toBeTruthy()
  })
})

it('renders App correctly', () => {
  let tree = renderer.create( 
  <Provider store={store}>
    <App user={{loginStatus: false}}/>
  </Provider>)
  expect(tree).toMatchSnapshot();
});