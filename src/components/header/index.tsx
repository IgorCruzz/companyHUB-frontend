import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'
import { Container, Content, PanelLink } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../../store/ducks/repositories/signin/actions'
import { IoIosSettings } from 'react-icons/io'
import { IUserState } from '../../store/ducks/repositories/user/types'

export const Header: React.FC = () => {
  const dispatch = useDispatch()
  const profile = useSelector((state: IUserState) => state.user.profile)

  return (
    <Container>
      <Content>
        <Link to="/">
          <strong>companyHUB</strong>
        </Link>

        <span>
          <p>Olá, {profile.name} </p>

          {profile.administrator && (
            <PanelLink data-testid="panel">
              <Link to="/panel">Painel Administrativo</Link>
            </PanelLink>
          )}

          <Link to="/setting">
            <IoIosSettings />
          </Link>

          <button
            type="button"
            data-testid="logout"
            onClick={() => dispatch(signOut())}>
            <AiOutlineLogout />
          </button>
        </span>
      </Content>
    </Container>
  )
}
