import { ICreateAuth, RepositoriesTypes } from './types'

export const authRequest = (data: ICreateAuth) => {
  return {
    type: RepositoriesTypes.AUTH_REQUEST,
    payload: { data },
  }
}

export const authSuccess = () => {
  return {
    type: RepositoriesTypes.AUTH_SUCCESS,
  }
}

export const authFailure = () => {
  return {
    type: RepositoriesTypes.AUTH_FAILURE,
  }
}
