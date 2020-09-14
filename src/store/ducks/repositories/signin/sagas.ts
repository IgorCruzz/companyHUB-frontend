import { takeLatest, call, put, all } from 'redux-saga/effects'
import { api } from '../../../../services/api'
import { signInFailure, signInSuccess } from './actions'
import { RepositoriesTypes } from './types'
import { toast } from 'react-toastify'

export function* signIn(action: any) {
  try {
    const response = yield call(api.post, 'session', action.payload.data)

    const { token, ...user } = response.data

    api.defaults.headers.Authorization = `Bearer ${token}`

    yield put(signInSuccess(token, user))
  } catch (e) {
    yield put(signInFailure())
    toast.error(e.response.data.error)
  }
}

export function setToken(action: any) {
  if (!action.payload) return

  const { token } = action.payload.signIn
  /* istanbul ignore else */
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(RepositoriesTypes.SIGNIN_REQUEST, signIn),
])
