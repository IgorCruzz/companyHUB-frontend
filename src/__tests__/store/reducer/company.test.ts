import {
  INITIAL_VALUES,
  company,
} from '../../../store/ducks/repositories/company/reducer'
import {
  companyRegisterRequest,
  companyRegisterSuccess,
  companyRegisterFailure,
  companyUpdateFailure,
  companyUpdateRequest,
  companyUpdateSuccess,
  companyDelete,
} from '../../../store/ducks/repositories/company/actions'

describe('Company', () => {
  it('companyRegisterRequest', () => {
    const state = company(
      INITIAL_VALUES,
      companyRegisterRequest({
        name: 'company',
        cnpj: '000.000.000/0000-0',
      })
    )

    expect(state).toStrictEqual({ loading: true })
  })

  it('companyRegisterSuccess', () => {
    const state = company(INITIAL_VALUES, companyRegisterSuccess())

    expect(state).toStrictEqual({ loading: false })
  })

  it('companyRegisterFailure', () => {
    const state = company(INITIAL_VALUES, companyRegisterFailure())

    expect(state).toStrictEqual({ loading: false })
  })

  it('companyUpdateRequest', () => {
    const state = company(
      INITIAL_VALUES,
      companyUpdateRequest({
        id: 1,
        name: 'company',
        cnpj: '000.000.000/0000-0',
      })
    )

    expect(state).toStrictEqual({ loading: true })
  })

  it('companyUpdateSuccess', () => {
    const state = company(INITIAL_VALUES, companyUpdateSuccess())

    expect(state).toStrictEqual({ loading: false })
  })

  it('companyUpdateFailure', () => {
    const state = company(INITIAL_VALUES, companyUpdateFailure())

    expect(state).toStrictEqual({ loading: false })
  })

  it('companyDelete', () => {
    const state = company(INITIAL_VALUES, companyDelete({ id: 1 }))

    expect(state).toStrictEqual({ loading: false })
  })

  it('DEFAULT', () => {
    const state = company(undefined, {})

    expect(state).toStrictEqual(INITIAL_VALUES)
  })
})
