import fire from '../../firebase'

import {
  LOADING_USER,
  SUCCESS_LOAD_USER,
  ERROR_LOAD_USER,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER
} from './actionTypes.user'

export const getAllUsers = () => {
  return dispatch => {
    dispatch(loadingUsers())
    let usersList = []
    fire.user.on('value', snapshot => {
      let user = snapshot.val()
      for(let key in user) {
        if(user.hasOwnProperty(key)) {
          usersList.push({key, ...user[key]})
        }
      }
      console.log('semua users', usersList)
      dispatch(successLoadUsers(usersList))
    }, err => {
      dispatch(errorLoadUsers())
    })
  }
}

const loadingUsers = () => ({
    type: LOADING_USER
})

const successLoadUsers = (payload) => ({
    type: SUCCESS_LOAD_USER,
    payload: payload
})

const errorLoadUsers = () => ({
    type: ERROR_LOAD_USER
})

export const addUser = (payload) => {
  return dispatch => {
    fire.user.push(payload)
    let usersList = []
    fire.user.once('value', snapshot => {
      let user = snapshot.val()
      for(let key in user) {
        if(user.hasOwnProperty(key)) {
          usersList.push({key, ...user[key]})
        }
      }
    })
    let newUser = usersList.pop()
    dispatch(successAddUser(newUser))
  }
}

const successAddUser = (payload) => ({
    type: ADD_USER,
    payload: payload
})
