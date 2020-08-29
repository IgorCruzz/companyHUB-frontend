import { all } from 'redux-saga/effects'

import signIn from './repositories/signin/sagas'
import user from './repositories/user/sagas'
import service from './repositories/service/sagas'
import product from './repositories/product/sagas'
import company from './repositories/company/sagas'
import auth from './repositories/auth/sagas'

export default function* rootSaga() {
  return yield all({
    signIn,
    user,
    service,
    product,
    company,
    auth,
  })
}
