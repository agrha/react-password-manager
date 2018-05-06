import {
  LOADING_PASSWORDS,
  SUCCESS_LOAD_PASSWORDS,
  ERROR_LOAD_PASSWORDS,
  ADD_PASSWORD,
  DELETE_PASSWORD,
  UPDATE_PASSWORD
  } from './actionTypes.password'
  
  let passwordInitial = {
    passwords: [],
    loading: true,
    error: false
  }
  
  function passwordReducer (state = {...passwordInitial}, action) {
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
      case ADD_PASSWORD:
      state.passwords.splice(0, (Math.floor(state.passwords.length / 2)) )
        return ({
          ...state,
          error: false,
          passwords: [
            ...state.passwords
          ]
        })
      case DELETE_PASSWORD:
      state.passwords.splice(0, (Math.floor(state.passwords.length / 2)) +1)
        return ({
          ...state,
          passwords: [
            ...state.passwords
          ]
        })
      case UPDATE_PASSWORD:
      state.passwords.splice(0, (Math.floor(state.passwords.length / 2)))
        return ({
          ...state,
          passwords: [
            ...state.passwords
          ]
      })
      default:
        return state
    }
  }
  
  export default passwordReducer