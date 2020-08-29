import { takeLatest, put, call, all } from 'redux-saga/effects'
import { api } from '../../../../services/api'
import {
  companyRegisterSuccess,
  companyRegisterFailure,
  companyUpdateFailure,
  companyUpdateSuccess,
} from './actions'
import { RepositoriesTypes } from './types'
import { toast } from 'react-toastify'

export function* createCompany(action: any) {
  try {
    yield call(api.post, 'companies', action.payload.data)

    toast.success('Empresa cadastrada com sucesso!!!')

    yield put(companyRegisterSuccess())

    window.history.back()
  } catch (e) {
    toast.error(e.response.data.error)
    yield put(companyRegisterFailure())
  }
}

export function* deleteCompany(action: any) {
  try {
    const { id } = action.payload.data

    yield call(api.delete, `companies/${id}`)

    window.location.reload()
  } catch (e) {
    toast.error(e.response.data.error)
  }
}

export function* updateCompany(action: any) {
  try {
    const { id } = action.payload.data

    yield call(api.put, `companies/${id}`, action.payload.data)

    toast.success('Empresa atualizada com sucesso!!!')
    yield put(companyUpdateSuccess())

    window.location.reload()
  } catch (e) {
    toast.error(e.response.data.error)
    yield put(companyUpdateFailure())
  }
}

export default all([
  takeLatest(RepositoriesTypes.COMPANY_REGISTER_REQUEST, createCompany),
  takeLatest(RepositoriesTypes.COMPANY_DELETE, deleteCompany),
  takeLatest(RepositoriesTypes.COMPANY_UPDATE_REQUEST, updateCompany),
])
