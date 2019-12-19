import React from 'react';

import { Container, Image } from './styles';

import logo from '~/assets/logo.png';
import logoGympoint from '~/assets/logoGympoint.png';

export default function Header() {
  return (
    <Container>
      <Image source={logo} />
      <Image source={logoGympoint} />
    </Container>
  );
}
