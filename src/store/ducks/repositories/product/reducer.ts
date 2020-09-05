import produce from 'immer'
import { RepositoriesTypes } from './types'

export const INITIAL_VALUES = {
  loading: false,
}

export function product(state = INITIAL_VALUES, action: any) {
  return produce(state, (draft) => {
    switch (action.type) {
      case RepositoriesTypes.PRODUCT_REGISTER_REQUEST: {
        draft.loading = true
        break
      }
      case RepositoriesTypes.PRODUCT_REGISTER_FAILURE: {
        draft.loading = false
        break
      }
      case RepositoriesTypes.PRODUCT_REGISTER_SUCCESS: {
        draft.loading = false
        break
      }
      case RepositoriesTypes.PRODUCT_UPDATE_REQUEST: {
        draft.loading = true
        break
      }
      case RepositoriesTypes.PRODUCT_UPDATE_FAILURE: {
        draft.loading = false
        break
      }
      case RepositoriesTypes.PRODUCT_UPDATE_SUCCESS: {
        draft.loading = false
        break
      }
      default:
    }
  })
}
