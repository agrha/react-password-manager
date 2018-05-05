import {
  LOADING_PASSWORDS,
  SUCCESS_LOAD_PASSWORDS,
  ERROR_LOAD_PASSWORDS
  } from './actionTypes.password'
  
  let initialStatePw = {
    passwords: [],
    loading: true,
    error: false
  }
  
  function passwordList (state = {...initialStatePw}, action) {
    switch (action.type) {
      case LOADING_PASSWORDS:
        return ({
          ...state,
          loading: true
        })
      case SUCCESS_LOAD_PASSWORDS:
        return ({
          ...state,
          passwords: action.payload,
          loading: false
        })
      case ERROR_LOAD_PASSWORDS:
        return ({
          ...state,
          loading: false,
          error: true
        })
      default:
        return state
    }
  }
  
  export default passwordList