import produce from 'immer'
import { RepositoriesTypes } from './types'
import { RepositoriesTypes as RepositoriesTypesUser } from '../user/types'

export const INITIAL_VALUES = {
  signed: false,
  loading: false,
  token: null,
}

export function signIn(state = INITIAL_VALUES, action: any) {
  return produce(state, (draft) => {
    switch (action.type) {
      case RepositoriesTypes.SIGNIN_REQUEST: {
        draft.loading = true
        break
      }
      case RepositoriesTypes.SIGNIN_FAILURE: {
        draft.loading = false
        break
      }
      case RepositoriesTypes.SIGNIN_SUCCESS: {
        draft.loading = false
        draft.signed = true
        draft.token = action.payload.token
        break
      }
      case RepositoriesTypes.SIGNOUT: {
        draft.signed = false
        draft.token = null
        break
      }
      case RepositoriesTypesUser.USER_DELETE: {
        draft.signed = false
        draft.token = null
        break
      }
      default:
    }
  })
}
