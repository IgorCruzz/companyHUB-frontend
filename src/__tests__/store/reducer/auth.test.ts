import {
  INITIAL_VALUES,
  auth,
} from '../../../store/ducks/repositories/auth/reducer'
import {
  authRequest,
  authSuccess,
  authFailure,
} from '../../../store/ducks/repositories/auth/actions'

describe('Auth', () => {
  it('authRequest', () => {
    const state = auth(
      INITIAL_VALUES,
      authRequest({
        token: 'TOKEN',
      })
    )

    expect(state).toStrictEqual({ loading: true })
  })

  it('authSuccess', () => {
    const state = auth(INITIAL_VALUES, authSuccess())

    expect(state).toStrictEqual({ loading: false })
  })

  it('authFailure', () => {
    const state = auth(INITIAL_VALUES, authFailure())

    expect(state).toStrictEqual({ loading: false })
  })

  it('DEFAULT', () => {
    const state = auth(undefined, {})

    expect(state).toStrictEqual(INITIAL_VALUES)
  })
})
