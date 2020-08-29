export enum RepositoriesTypes {
  SIGNIN_REQUEST = 'signin/SIGNIN_REQUEST',
  SIGNIN_SUCCESS = 'signin/SIGNIN_SUCCESS',
  SIGNIN_FAILURE = 'signin/SIGNIN_FAILURE',
  SIGNOUT = '@signin/SIGN_OUT',
}

export interface ILogin {
  email: string
  password: string
}

export interface ILoginState {
  signIn: {
    signed?: boolean
    loading?: boolean
  }
}
