import produce from 'immer'
import { RepositoriesTypes } from './types'

export const INITIAL_VALUES = {
  loading: false,
}

export function service(state = INITIAL_VALUES, action: any) {
  return produce(state, (draft) => {
    switch (action.type) {
      case RepositoriesTypes.SERVICE_REGISTER_REQUEST: {
        draft.loading = true
        break
      }
      case RepositoriesTypes.SERVICE_REGISTER_FAILURE: {
        draft.loading = false
        break
      }
      case RepositoriesTypes.SERVICE_REGISTER_SUCCESS: {
        draft.loading = false
        break
      }
      case RepositoriesTypes.SERVICE_UPDATE_REQUEST: {
        draft.loading = true
        break
      }
      case RepositoriesTypes.SERVICE_UPDATE_FAILURE: {
        draft.loading = false
        break
      }
      case RepositoriesTypes.SERVICE_UPDATE_SUCCESS: {
        draft.loading = false
        break
      }
      default:
    }
  })
}
