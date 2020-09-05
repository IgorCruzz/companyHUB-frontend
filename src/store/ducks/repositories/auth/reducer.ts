import produce from 'immer'
import { RepositoriesTypes } from './types'

export const INITIAL_VALUES = {
  loading: false,
}

export function auth(state = INITIAL_VALUES, action: any) {
  return produce(state, (draft) => {
    switch (action.type) {
      case RepositoriesTypes.AUTH_REQUEST: {
        draft.loading = true
        break
      }
      case RepositoriesTypes.AUTH_FAILURE: {
        draft.loading = false
        break
      }
      case RepositoriesTypes.AUTH_SUCCESS: {
        draft.loading = false
        break
      }
      default:
    }
  })
}
