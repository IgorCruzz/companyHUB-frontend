export enum RepositoriesTypes {
  USER_CREATE_REQUEST = '@user/SIGNUP_REQUEST',
  USER_CREATE_SUCESS = '@user/SIGNUP_SUCCESS',
  USER_CREATE_FAILURE = '@user/SIGNUP_FAILURE',
  USER_UPDATE_REQUEST = '@user/USER_UPDATE_REQUEST',
  USER_UPDATE_SUCESS = '@user/USER_UPDATE_SUCCESS',
  USER_UPDATE_FAILURE = '@user/USER_UPDATE_FAILURE',
  USER_DELETE = '@user/USER_DELETE',
}

export interface IUserCreate {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface IUserUpdate {
  id: number
  name?: string
  email?: string
  oldPassword?: string
  password?: string
  confirmPassword?: string
}

export interface IUserState {
  user: {
    loading: boolean
    profile: {
      id: number
      name: string
      administrator: boolean
      email: string
    }
  }
}
