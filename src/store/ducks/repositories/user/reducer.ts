import produce from 'immer'
import { RepositoriesTypes } from './types'
import { RepositoriesTypes as RepositoriesTypesAuth } from '../signin/types'

export const INITIAL_VALUES = {
  loading: false,
  profile: [],
}

export function user(state = INITIAL_VALUES, action: any) {
  return produce(state, (draft) => {
    switch (action.type) {
      case RepositoriesTypesAuth.SIGNIN_SUCCESS: {
        draft.profile = action.payload.user
        break
      }
      case RepositoriesTypesAuth.SIGNOUT: {
        draft.profile = []
        break
      }
      case RepositoriesTypes.USER_CREATE_REQUEST: {
        draft.loading = true
        break
      }
      case RepositoriesTypes.USER_CREATE_FAILURE: {
        draft.loading = false
        break
      }
      case RepositoriesTypes.USER_CREATE_SUCESS: {
        draft.loading = false
        break
      }
      case RepositoriesTypes.USER_UPDATE_REQUEST: {
        draft.loading = true
        break
      }
      case RepositoriesTypes.USER_UPDATE_FAILURE: {
        draft.loading = false
        break
      }
      case RepositoriesTypes.USER_UPDATE_SUCESS: {
        draft.loading = false
        break
      }
      case RepositoriesTypes.USER_DELETE: {
        draft.profile = []
        break
      }
      default:
    }
  })
}
