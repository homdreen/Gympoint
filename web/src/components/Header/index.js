import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.svg';
import logoGympoint from '~/assets/logoGympoint.svg';

import { Container, Content, LinkElement } from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <div>
            <img src={logo} alt="Logo Gympoint" />
            <img src={logoGympoint} alt="Logo Gympoint" />
          </div>

          <LinkElement to="/dashboard" active="true">
            ALUNOS
          </LinkElement>

          <LinkElement to="/plans">PLANOS</LinkElement>

          <LinkElement to="/registrations">MATRÍCULAS</LinkElement>

          <LinkElement to="/help-orders">PEDIDOS DE AUXÍLIO</LinkElement>
        </nav>

        <aside>
          <p>{profile.name}</p>
          <span role="button" tabIndex={0} onClick={handleSignOut}>
            sair do sistema
          </span>
        </aside>
      </Content>
    </Container>
  );
}
