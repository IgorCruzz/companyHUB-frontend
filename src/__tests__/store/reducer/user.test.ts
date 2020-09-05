import {
  userDelete,
  userCreateFailure,
  userCreateRequest,
  userCreateSuccess,
  userUpdateFailure,
  userUpdateRequest,
  userUpdateSuccess,
} from '../../../store/ducks/repositories/user/actions'
import {
  signInSuccess,
  signOut,
} from '../../../store/ducks/repositories/signin/actions'
import {
  INITIAL_VALUES,
  user,
} from '../../../store/ducks/repositories/user/reducer'

describe('User', () => {
  it('userCreateRequest', () => {
    const state = user(
      INITIAL_VALUES,
      userCreateRequest({
        name: 'username',
        email: 'user@email',
        password: 'password',
        confirmPassword: 'password',
      })
    )

    expect(state).toStrictEqual({ loading: true, profile: [] })
  })

  it('userCreateSuccess', () => {
    const state = user(INITIAL_VALUES, userCreateSuccess())

    expect(state).toStrictEqual({ loading: false, profile: [] })
  })

  it('userCreateFailure', () => {
    const state = user(INITIAL_VALUES, userCreateFailure())

    expect(state).toStrictEqual({ loading: false, profile: [] })
  })

  it('userUpdateRequest', () => {
    const state = user(
      INITIAL_VALUES,
      userUpdateRequest({
        id: 1,
        name: 'username',
      })
    )

    expect(state).toStrictEqual({ loading: true, profile: [] })
  })

  it('userUpdateSuccess', () => {
    const state = user(INITIAL_VALUES, userUpdateSuccess())

    expect(state).toStrictEqual({ loading: false, profile: [] })
  })

  it('userUpdateFailure', () => {
    const state = user(INITIAL_VALUES, userUpdateFailure())

    expect(state).toStrictEqual({ loading: false, profile: [] })
  })

  it('userDelete', () => {
    const state = user(INITIAL_VALUES, userDelete({ id: 1 }))

    expect(state).toStrictEqual({ loading: false, profile: [] })
  })

  it('signInSuccess', () => {
    const signInData = {
      token: 'token',
      user: {
        id: 1,
        name: 'username',
        email: 'user@email.com',
      },
    }
    const state = user(
      INITIAL_VALUES,
      signInSuccess(signInData.token, signInData.user)
    )

    expect(state).toStrictEqual({
      loading: false,
      profile: { id: 1, email: 'user@email.com', name: 'username' },
    })
  })

  it('signOut', () => {
    const state = user(INITIAL_VALUES, signOut())

    expect(state).toStrictEqual({ loading: false, profile: [] })
  })

  it('DEFAULT', () => {
    const state = user(undefined, {})

    expect(state).toStrictEqual(INITIAL_VALUES)
  })
})
