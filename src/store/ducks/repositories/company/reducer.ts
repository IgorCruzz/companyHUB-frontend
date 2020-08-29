import produce from 'immer'
import { RepositoriesTypes } from './types'

const INITIAL_VALUES = {
  loading: false,
}

export function company(state = INITIAL_VALUES, action: any) {
  return produce(state, (draft) => {
    switch (action.type) {
      case RepositoriesTypes.COMPANY_REGISTER_REQUEST: {
        draft.loading = true
        break
      }
      case RepositoriesTypes.COMPANY_REGISTER_FAILURE: {
        draft.loading = false
        break
      }
      case RepositoriesTypes.COMPANY_REGISTER_SUCCESS: {
        draft.loading = false
        break
      }
      case RepositoriesTypes.COMPANY_UPDATE_REQUEST: {
        draft.loading = true
        break
      }
      case RepositoriesTypes.COMPANY_UPDATE_FAILURE: {
        draft.loading = false
        break
      }
      case RepositoriesTypes.COMPANY_UPDATE_SUCCESS: {
        draft.loading = false
        break
      }
      default:
    }
  })
}
