import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { formatDistance, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

import { useSelector } from 'react-redux';

import Icon from '@expo/vector-icons/MaterialIcons';

import Header from '~/components/Header';

import api from '~/services/api';

import { Container, CheckinButton } from './styles';

export default function Checkin() {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);
  const studentId = useSelector(state => state.user.id);

  useEffect(() => {
    async function loadCheckins() {
      setLoading(true);
      try {
        const response = await api.get(`/students/${studentId}/checkins`);

        const data = response.data.map(checkin => ({
          ...checkin,
          dateFormatted: formatDistance(
            parseISO(checkin.createdAt),
            new Date(),
            {
              addSuffix: true,
              locale: pt,
            }
          ),
        }));

        setCheckins(data);
      } catch (err) {
        Alert.alert(
          'Falha!',
          'Não foi possível recuperar check-ins já feitos!'
        );
      }
      setLoading(false);
    }

    loadCheckins();
  }, [studentId]);

  return (
    <>
      <Header />

      <Container>
        <CheckinButton loading={loading}>Novo check-in</CheckinButton>
      </Container>
    </>
  );
}

Checkin.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};
