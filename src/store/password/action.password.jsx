import fire from '../../firebase'

import {
  LOADING_PASSWORDS,
  SUCCESS_LOAD_PASSWORDS,
  ERROR_LOAD_PASSWORDS,
  ADD_PASSWORD,
  DELETE_PASSWORD,
  UPDATE_PASSWORD
} from './actionTypes.password'

export const getAllPassword = () => {
  return dispatch => {
    dispatch(loadingPasswords())
    let passwordList = []
    fire.password.on('value', snapshot => {
      let pw = snapshot.val()
      for(let key in pw) {
        if(pw.hasOwnProperty(key)) {
          passwordList.push({key, ...pw[key]})
        }
      }
      console.log('semua password', passwordList)
      dispatch(successLoadPassword(passwordList))
    }, err => {
      dispatch(errorLoadPasswords())
    })
  }
}

const loadingPasswords = () => ({
    type: LOADING_PASSWORDS
})

const successLoadPassword = (payload) => ({
    type: SUCCESS_LOAD_PASSWORDS,
    payload: payload
})

const errorLoadPasswords = () => ({
    type: ERROR_LOAD_PASSWORDS
})

export const addPassword = (payload) => {
  return dispatch => {
    fire.password.push(payload)
    let passwordList = []
    fire.password.once('value', snapshot => {
      let pw = snapshot.val()
      for(let key in pw) {
        if(pw.hasOwnProperty(key)) {
          passwordList.push({key, ...pw[key]})
        }
      }
    })
    let newPassword = passwordList.pop()
    dispatch(successAddPassword(newPassword))
  }
}

const successAddPassword = (payload) => ({
    type: ADD_PASSWORD,
    payload: payload
})

export const removePassword = (key) => {
  return dispatch => {
    fire.password.child(key).remove()
    dispatch(deletePassword())
  }
}

const deletePassword = ()=> ({
    type: DELETE_PASSWORD
})

export const editPassword = (payload) => {
  return dispatch => {
    fire.password.child(payload.key).set({
      url: payload.url,
      username: payload.username,
      password: payload.password,
      userId: payload.userId,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt
    })
    dispatch(updatePassword(payload))
  }
}

const updatePassword = (payload) => ({
    type: UPDATE_PASSWORD,
    payload: payload
})
