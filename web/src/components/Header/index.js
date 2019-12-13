import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';
import logoGympoint from '~/assets/logoGympoint.svg';

import { Container } from './styles';

export default function Header() {
  return (
    <Container>
      <div>
        <img src={logo} alt="Logo Gympoint" />
        <img src={logoGympoint} alt="Logo Gympoint" />
      </div>
    </Container>
  );
}
