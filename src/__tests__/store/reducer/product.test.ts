import {
  INITIAL_VALUES,
  product,
} from '../../../store/ducks/repositories/product/reducer'
import {
  productDelete,
  productRegisterFailure,
  productRegisterRequest,
  productRegisterSuccess,
  productUpdateFailure,
  productUpdateRequest,
  productUpdateSuccess,
} from '../../../store/ducks/repositories/product/actions'

describe('Product', () => {
  it('productRegisterRequest', () => {
    const state = product(
      INITIAL_VALUES,
      productRegisterRequest({
        name: 'product',
        company_id: 1,
      })
    )

    expect(state).toStrictEqual({ loading: true })
  })

  it('productRegisterSuccess', () => {
    const state = product(INITIAL_VALUES, productRegisterSuccess())

    expect(state).toStrictEqual({ loading: false })
  })

  it('productRegisterFailure', () => {
    const state = product(INITIAL_VALUES, productRegisterFailure())

    expect(state).toStrictEqual({ loading: false })
  })

  it('productUpdateRequest', () => {
    const state = product(
      INITIAL_VALUES,
      productUpdateRequest({
        id: 1,
        name: 'product',
        company_id: 1,
      })
    )

    expect(state).toStrictEqual({ loading: true })
  })

  it('productUpdateSuccess', () => {
    const state = product(INITIAL_VALUES, productUpdateSuccess())

    expect(state).toStrictEqual({ loading: false })
  })

  it('productUpdateFailure', () => {
    const state = product(INITIAL_VALUES, productUpdateFailure())

    expect(state).toStrictEqual({ loading: false })
  })

  it('productDelete', () => {
    const state = product(
      INITIAL_VALUES,
      productDelete({ id: 1, company_id: 1 })
    )

    expect(state).toStrictEqual({ loading: false })
  })

  it('DEFAULT', () => {
    const state = product(undefined, {})

    expect(state).toStrictEqual(INITIAL_VALUES)
  })
})
