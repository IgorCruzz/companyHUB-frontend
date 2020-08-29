import { ILogin, RepositoriesTypes } from './types'

export const signInRequest = (data: ILogin) => {
  return {
    type: RepositoriesTypes.SIGNIN_REQUEST,
    payload: { data },
  }
}

export const signInFailure = () => {
  return {
    type: RepositoriesTypes.SIGNIN_FAILURE,
  }
}

export const signInSuccess = (
  token: string,
  user: { id: number; name: string; email: string }
) => {
  return {
    type: RepositoriesTypes.SIGNIN_SUCCESS,
    payload: { token, user },
  }
}

export const signOut = () => {
  return {
    type: RepositoriesTypes.SIGNOUT,
  }
}
