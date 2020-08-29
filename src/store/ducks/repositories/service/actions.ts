import { ICreateService, RepositoriesTypes, IUpdateService } from './types'

export const serviceRegisterRequest = (data: ICreateService) => {
  return {
    type: RepositoriesTypes.SERVICE_REGISTER_REQUEST,
    payload: { data },
  }
}

export const serviceRegisterFailure = () => {
  return {
    type: RepositoriesTypes.SERVICE_REGISTER_FAILURE,
  }
}

export const serviceRegisterSuccess = () => {
  return {
    type: RepositoriesTypes.SERVICE_REGISTER_SUCCESS,
  }
}

export const serviceDelete = (data: { product_id: number; id: number }) => {
  return {
    type: RepositoriesTypes.SERVICE_DELETE,
    payload: { data },
  }
}

export const serviceUpdateRequest = (data: IUpdateService) => {
  return {
    type: RepositoriesTypes.SERVICE_UPDATE_REQUEST,
    payload: { data },
  }
}

export const serviceUpdateFailure = () => {
  return {
    type: RepositoriesTypes.SERVICE_UPDATE_FAILURE,
  }
}

export const serviceUpdateSuccess = () => {
  return {
    type: RepositoriesTypes.SERVICE_UPDATE_SUCCESS,
  }
}
