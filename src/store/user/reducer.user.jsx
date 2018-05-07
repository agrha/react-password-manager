import {
  LOADING_USER,
  SUCCESS_LOAD_USER,
  ERROR_LOAD_USER,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER
  } from './actionTypes.user'
  
  let userInitial = {
    users: [],
    loading: true,
    error: false
  }
  
  function userReducer (state = {...userInitial}, action) {
    switch (action.type) {
      case LOADING_USER:
        return ({
          ...state,
          loading: true
        })
      case SUCCESS_LOAD_USER:
        return ({
          ...state,
          users: action.payload,
          loading: false
        })
      case ERROR_LOAD_USER:
        return ({
          ...state,
          loading: false,
          error: true
        })
      case ADD_USER:
      state.users.splice(0, (Math.floor(state.users.length / 2)) )
        return ({
          ...state,
          error: false,
          users: [
            ...state.users
          ]
        })
      case DELETE_USER:
      state.users.splice(0, (Math.floor(state.users.length / 2)) +1)
        return ({
          ...state,
          users: [
            ...state.users
          ]
        })
      case UPDATE_USER:
      state.users.splice(0, (Math.floor(state.users.length / 2)))
        return ({
          ...state,
          users: [
            ...state.users
          ]
      })
      default:
        return state
    }
  }
  
  export default userReducer