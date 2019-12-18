import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import logo from '~/assets/logo.png';
import logoGympoint from '~/assets/logoGympoint.png';

import { Container, Image, Form, FormInput, SubmitButton } from './styles';
import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();
  const [id, setId] = useState('');

  function handleSubmit() {
    dispatch(signInRequest(id));
  }

  return (
    <Container>
      <Image source={logo} />
      <Image source={logoGympoint} />

      <Form>
        <FormInput
          keyboardType="number-pad"
          autoCorrect={false}
          placeholder="Informe seu ID de cadastro"
          value={id}
          onChangeText={setId}
        />

        <SubmitButton onPress={handleSubmit}>Entrar no sistema</SubmitButton>
      </Form>
    </Container>
  );
}
