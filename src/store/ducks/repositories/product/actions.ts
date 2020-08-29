import { ICreateProduct, RepositoriesTypes, IUpdateProduct } from './types'

export const productRegisterRequest = (data: ICreateProduct) => {
  return {
    type: RepositoriesTypes.PRODUCT_REGISTER_REQUEST,
    payload: { data },
  }
}

export const productRegisterFailure = () => {
  return {
    type: RepositoriesTypes.PRODUCT_REGISTER_FAILURE,
  }
}

export const productRegisterSuccess = () => {
  return {
    type: RepositoriesTypes.PRODUCT_REGISTER_SUCCESS,
  }
}

export const productDelete = (data: { id: number; company_id: number }) => {
  return {
    type: RepositoriesTypes.PRODUCT_DELETE,
    payload: { data },
  }
}

export const productUpdateRequest = (data: IUpdateProduct) => {
  return {
    type: RepositoriesTypes.PRODUCT_UPDATE_REQUEST,
    payload: { data },
  }
}

export const productUpdateFailure = () => {
  return {
    type: RepositoriesTypes.PRODUCT_UPDATE_FAILURE,
  }
}

export const productUpdateSuccess = () => {
  return {
    type: RepositoriesTypes.PRODUCT_UPDATE_SUCCESS,
  }
}
