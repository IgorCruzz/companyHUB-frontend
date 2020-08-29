import { takeLatest, call, put, all } from 'redux-saga/effects'
import { authFailure, authSuccess } from './actions'
import { api } from '../../../../services/api'
import { toast } from 'react-toastify'
import { RepositoriesTypes } from './types'

export function* authCreate(action: any) {
  try {
    const { token } = action.payload.data

    yield call(api.put, `auth/${token}`)

    yield put(authSuccess())

    toast.success('Conta ativada com sucesso!!!')

    window.location.href = '/'
  } catch (e) {
    yield put(authFailure())
    toast.error(e.response.data.error)
  }
}

export default all([takeLatest(RepositoriesTypes.AUTH_REQUEST, authCreate)])
