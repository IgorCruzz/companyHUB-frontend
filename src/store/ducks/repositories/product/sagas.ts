import { takeLatest, put, call, all } from 'redux-saga/effects'
import { api } from '../../../../services/api'
import {
  productRegisterFailure,
  productRegisterSuccess,
  productUpdateFailure,
  productUpdateSuccess,
} from './actions'
import { RepositoriesTypes } from './types'
import { toast } from 'react-toastify'

export function* createProduct(action: any) {
  try {
    yield call(api.post, 'products', action.payload.data)

    toast.success('Produto criado com sucesso!!!')

    yield put(productRegisterSuccess())

    window.history.back()
  } catch (e) {
    toast.error(e.response.data.error)
    yield put(productRegisterFailure())
  }
}

export function* deleteProduct(action: any) {
  try {
    const { id, company_id } = action.payload.data

    yield call(api.delete, `products/${id}`, { data: { company_id } })

    window.location.reload()
  } catch (e) {
    toast.error(e.response.data.error)
  }
}

export function* updateProduct(action: any) {
  try {
    const { id } = action.payload.data

    yield call(api.put, `products/${id}`, action.payload.data)

    toast.success('Produto atualizado com sucesso!!!')
    yield put(productUpdateSuccess())

    window.location.reload()
  } catch (e) {
    toast.error(e.response.data.error)
    yield put(productUpdateFailure())
  }
}

export default all([
  takeLatest(RepositoriesTypes.PRODUCT_REGISTER_REQUEST, createProduct),
  takeLatest(RepositoriesTypes.PRODUCT_DELETE, deleteProduct),
  takeLatest(RepositoriesTypes.PRODUCT_UPDATE_REQUEST, updateProduct),
])
