import {createStore, combineReducers, applyMiddleware} from 'redux'
import passwordReducer from './password/reducer.password'
import userReducer from './user/reducer.user'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  password: passwordReducer,
  user: userReducer
})

const store = createStore (
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

export default store