import {
  INITIAL_VALUES,
  service,
} from '../../../store/ducks/repositories/service/reducer'
import {
  serviceDelete,
  serviceRegisterFailure,
  serviceRegisterRequest,
  serviceRegisterSuccess,
  serviceUpdateFailure,
  serviceUpdateRequest,
  serviceUpdateSuccess,
} from '../../../store/ducks/repositories/service/actions'

describe('Product', () => {
  it('serviceRegisterRequest', () => {
    const state = service(
      INITIAL_VALUES,
      serviceRegisterRequest({
        name: 'service',
        description: 'description',
        product_id: 1,
      })
    )

    expect(state).toStrictEqual({ loading: true })
  })

  it('serviceRegisterSuccess', () => {
    const state = service(INITIAL_VALUES, serviceRegisterSuccess())

    expect(state).toStrictEqual({ loading: false })
  })

  it('serviceRegisterFailure', () => {
    const state = service(INITIAL_VALUES, serviceRegisterFailure())

    expect(state).toStrictEqual({ loading: false })
  })

  it('serviceUpdateRequest', () => {
    const state = service(
      INITIAL_VALUES,
      serviceUpdateRequest({
        id: 1,
        name: 'service',
        description: 'description',
        product_id: 1,
      })
    )

    expect(state).toStrictEqual({ loading: true })
  })

  it('serviceUpdateSuccess', () => {
    const state = service(INITIAL_VALUES, serviceUpdateSuccess())

    expect(state).toStrictEqual({ loading: false })
  })

  it('serviceUpdateFailure', () => {
    const state = service(INITIAL_VALUES, serviceUpdateFailure())

    expect(state).toStrictEqual({ loading: false })
  })

  it('serviceDelete', () => {
    const state = service(
      INITIAL_VALUES,
      serviceDelete({ id: 1, product_id: 1 })
    )

    expect(state).toStrictEqual({ loading: false })
  })

  it('DEFAULT', () => {
    const state = service(undefined, {})

    expect(state).toStrictEqual(INITIAL_VALUES)
  })
})
