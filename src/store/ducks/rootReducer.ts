import { combineReducers } from 'redux'
import { signIn } from './repositories/signin/reducer'
import { user } from './repositories/user/reducer'
import { service } from './repositories/service/reducer'
import { product } from './repositories/product/reducer'
import { company } from './repositories/company/reducer'
import { auth } from './repositories/auth/reducer'

export default combineReducers({
  signIn,
  user,
  service,
  product,
  company,
  auth,
})
