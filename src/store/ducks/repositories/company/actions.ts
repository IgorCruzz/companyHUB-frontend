import { ICreateCompany, RepositoriesTypes, IUpdateCompany } from './types'

export const companyRegisterRequest = (data: ICreateCompany) => {
  return {
    type: RepositoriesTypes.COMPANY_REGISTER_REQUEST,
    payload: { data },
  }
}

export const companyRegisterFailure = () => {
  return {
    type: RepositoriesTypes.COMPANY_REGISTER_FAILURE,
  }
}

export const companyRegisterSuccess = () => {
  return {
    type: RepositoriesTypes.COMPANY_REGISTER_SUCCESS,
  }
}

export const companyDelete = (data: { id: number }) => {
  return {
    type: RepositoriesTypes.COMPANY_DELETE,
    payload: { data },
  }
}

export const companyUpdateRequest = (data: IUpdateCompany) => {
  return {
    type: RepositoriesTypes.COMPANY_UPDATE_REQUEST,
    payload: { data },
  }
}

export const companyUpdateFailure = () => {
  return {
    type: RepositoriesTypes.COMPANY_UPDATE_FAILURE,
  }
}

export const companyUpdateSuccess = () => {
  return {
    type: RepositoriesTypes.COMPANY_UPDATE_SUCCESS,
  }
}
