import password from '../../firebase'

import {
  LOADING_PASSWORDS,
  SUCCESS_LOAD_PASSWORDS,
  ERROR_LOAD_PASSWORDS,
} from './actionTypes.password'

export function getAllPassword () {
  return dispatch => {
    dispatch(loadingPasswords())
    let passwordList = []
    password.on('value', snapshot => {
      let pw = snapshot.val()
      for(let key in pw) {
        if(pw.hasOwnProperty(key)) {
          passwordList.push({key, ...pw[key]})
        }
      }
      console.log(passwordList, 'ini array di get All')
      dispatch(successLoadPassword(passwordList))
    }, err => {
      dispatch(errorLoadPasswords())
    })
  }
}

export function loadingPasswords () {
  return {
    type: LOADING_PASSWORDS
  }
}

export function successLoadPassword (payload) {
  return {
    type: SUCCESS_LOAD_PASSWORDS,
    payload: payload
  }
}

export function errorLoadPasswords () {
  return {
    type: ERROR_LOAD_PASSWORDS
  }
}

export function SuccessAddPassword (payload) {
  return {
    type: ADD_PASSWORD,
    payload: payload
  }
}

export function deletePassword () {
  return {
    type: DELETE_PASSWORD
  }
}

export function updatePassword (payload) {
  return {
    type: UPDATE_PASSWORD,
    payload: payload
  }
}