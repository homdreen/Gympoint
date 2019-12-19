import React from 'react';
import { View } from 'react-native';

import Icon from '@expo/vector-icons/MaterialIcons';

import Header from '~/components/Header';

// import { Container } from './styles';

export default function Checkin() {
  return (
    <>
      <Header />
    </>
  );
}

Checkin.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};
