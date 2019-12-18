import React from 'react';

import logo from '~/assets/logo.png';
import logoGympoint from '~/assets/logoGympoint.png';

import { Container, Image, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  return (
    <Container>
      <Image source={logo} />
      <Image source={logoGympoint} />

      <Form>
        <FormInput
          keyboardType="number-pad"
          autoCorrect={false}
          placeholder="Informe seu ID de cadastro"
        />

        <SubmitButton onPress={() => {}}>Entrar no sistema</SubmitButton>
      </Form>
    </Container>
  );
}
