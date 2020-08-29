import { takeLatest, put, call, all } from 'redux-saga/effects'
import { api } from '../../../../services/api'
import {
  serviceRegisterSuccess,
  serviceRegisterFailure,
  serviceUpdateSuccess,
  serviceUpdateFailure,
} from './actions'
import { RepositoriesTypes } from './types'
import { toast } from 'react-toastify'

export function* createService(action: any) {
  try {
    yield call(api.post, 'services', action.payload.data)

    toast.success('Serviço criado com sucesso!!!')
    yield put(serviceRegisterSuccess())

    window.history.back()
  } catch (e) {
    toast.error(e.response.data.error)
    yield put(serviceRegisterFailure())
  }
}

export function* deleteService(action: any) {
  try {
    const { id, product_id } = action.payload.data

    yield call(api.delete, `services/${id}`, { data: { product_id } })

    toast.success('Serviço excluído com sucesso')

    window.location.reload()
  } catch (e) {
    toast.error(e.response.data.error)
  }
}

export function* updateService(action: any) {
  try {
    const { id } = action.payload.data

    yield call(api.put, `services/${id}`, action.payload.data)

    toast.success('Serviço atualizado com sucesso!!!')
    yield put(serviceUpdateSuccess())

    window.location.reload()
  } catch (e) {
    toast.error(e.response.data.error)
    yield put(serviceUpdateFailure())
  }
}

export default all([
  takeLatest(RepositoriesTypes.SERVICE_REGISTER_REQUEST, createService),
  takeLatest(RepositoriesTypes.SERVICE_DELETE, deleteService),
  takeLatest(RepositoriesTypes.SERVICE_UPDATE_REQUEST, updateService),
])
