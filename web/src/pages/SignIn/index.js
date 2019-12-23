import React from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';
import logoGympoint from '~/assets/logoGympoint.svg';
import { Container, Box, BoxLogo } from './styles';

const schema = Yup.object().shape({
  name: Yup.string()
    .email('Aceita apenas e-mails válidos')
    .required('Este campo é obrigatório'),
  password: Yup.string().required('Este campo é obrigatório'),
});

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ name, password }) {
    dispatch(signInRequest(name, password));
  }

  return (
    <Container>
      <Box>
        <BoxLogo>
          <img src={logo} alt="Logo Gympoint" />
          <img src={logoGympoint} alt="Logo Gympoint" />
        </BoxLogo>

        <Form schema={schema} onSubmit={handleSubmit}>
          <p>SEU E-MAIL</p>
          <Input type="text" name="name" placeholder="admin@gympoint.com" />
          <p>SUA SENHA</p>
          <Input type="password" name="password" placeholder="*******" />

          <button type="submit">Entrar no sistema</button>
        </Form>
      </Box>
    </Container>
  );
}
