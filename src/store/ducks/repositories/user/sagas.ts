import { takeLatest, call, put, all } from 'redux-saga/effects'

import { api } from '../../../../services/api'
import {
  userCreateFailure,
  userCreateSuccess,
  userUpdateFailure,
  userUpdateSuccess,
} from './actions'
import { RepositoriesTypes } from './types'
import { toast } from 'react-toastify'

export function* createUser(action: any) {
  try {
    yield call(api.post, 'users', action.payload.data)

    yield put(userCreateSuccess())

    window.location.href = '/message'
  } catch (e) {
    yield put(userCreateFailure())
    toast.error(e.response.data.error)
  }
}

export function* updateUser(action: any) {
  try {
    const { id, ...user } = action.payload.data

    yield call(api.put, `users/${id}`, user)

    yield put(userUpdateSuccess())
    toast.success('Reloge no site para atualizar as informações')
  } catch (e) {
    yield put(userUpdateFailure())
    toast.error(e.response.data.error)
  }
}

export function* deleteUser(action: any) {
  try {
    const { id } = action.payload.data

    yield call(api.delete, `users/${id}`)

    toast.success('Conta deletada com sucesso!!!')
  } catch (e) {
    toast.error(e.response.data.error)
  }
}

export default all([
  takeLatest(RepositoriesTypes.USER_CREATE_REQUEST, createUser),
  takeLatest(RepositoriesTypes.USER_UPDATE_REQUEST, updateUser),
  takeLatest(RepositoriesTypes.USER_DELETE, deleteUser),
])
