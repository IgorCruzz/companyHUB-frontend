import { RepositoriesTypes, IUserCreate, IUserUpdate } from './types'

export const userCreateRequest = (data: IUserCreate) => {
  return {
    type: RepositoriesTypes.USER_CREATE_REQUEST,
    payload: { data },
  }
}

export const userCreateSuccess = () => {
  return {
    type: RepositoriesTypes.USER_CREATE_SUCESS,
  }
}

export const userCreateFailure = () => {
  return {
    type: RepositoriesTypes.USER_CREATE_FAILURE,
  }
}

export const userUpdateRequest = (data: IUserUpdate) => {
  return {
    type: RepositoriesTypes.USER_UPDATE_REQUEST,
    payload: { data },
  }
}

export const userUpdateSuccess = () => {
  return {
    type: RepositoriesTypes.USER_UPDATE_SUCESS,
  }
}

export const userUpdateFailure = () => {
  return {
    type: RepositoriesTypes.USER_UPDATE_FAILURE,
  }
}

export const userDelete = (data: { id: number }) => {
  return {
    type: RepositoriesTypes.USER_DELETE,
    payload: { data },
  }
}
