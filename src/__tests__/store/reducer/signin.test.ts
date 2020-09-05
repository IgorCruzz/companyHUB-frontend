import {
  INITIAL_VALUES,
  signIn,
} from '../../../store/ducks/repositories/signin/reducer'
import {
  signInFailure,
  signInRequest,
  signInSuccess,
  signOut,
} from '../../../store/ducks/repositories/signin/actions'

import { userDelete } from '../../../store/ducks/repositories/user/actions'

describe('SignIN', () => {
  it('signInRequest', () => {
    const signinData = {
      email: 'user@email.com',
      password: 'password',
    }

    const state = signIn(INITIAL_VALUES, signInRequest(signinData))

    expect(state).toStrictEqual({ loading: true, signed: false, token: null })
  })

  it('signInSuccess', () => {
    const signinData = {
      token: 'token',
      user: { id: 1, name: 'username', email: 'user@email.com' },
    }

    const state = signIn(
      INITIAL_VALUES,
      signInSuccess(signinData.token, signinData.user)
    )

    expect(state).toStrictEqual({
      loading: false,
      signed: true,
      token: 'token',
    })
  })

  it('signInFailure', () => {
    const state = signIn(INITIAL_VALUES, signInFailure())

    expect(state).toStrictEqual({ loading: false, signed: false, token: null })
  })

  it('signOut', () => {
    const state = signIn(INITIAL_VALUES, signOut())

    expect(state).toStrictEqual({ loading: false, signed: false, token: null })
  })

  it('userDelete', () => {
    const state = signIn(INITIAL_VALUES, userDelete({ id: 1 }))

    expect(state).toStrictEqual({ loading: false, signed: false, token: null })
  })

  it('DEFAULT', () => {
    const state = signIn(undefined, {})

    expect(state).toStrictEqual(INITIAL_VALUES)
  })
})
