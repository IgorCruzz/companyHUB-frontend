export enum RepositoriesTypes {
  AUTH_REQUEST = '@auth/AUTH_REQUEST',
  AUTH_SUCCESS = '@auth/AUTH_SUCCESS',
  AUTH_FAILURE = '@auth/AUTH_FAILURE',
}

export interface ICreateAuth {
  token: string
}

export interface IAuthState {
  auth: {
    loading: boolean
  }
}
