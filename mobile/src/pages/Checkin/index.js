import React, { useEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { formatDistance, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

import { useSelector } from 'react-redux';

import Icon from '@expo/vector-icons/MaterialIcons';

import Header from '~/components/Header';

import api from '~/services/api';

import {
  Container,
  CheckinButton,
  CheckinList,
  CheckinItem,
  CheckinText,
  CheckinDate,
} from './styles';

export default function Checkin() {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);
  const studentId = useSelector(state => state.user.id);

  const loadCheckins = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/students/${studentId}/checkins`);

      const data = response.data.map(checkin => ({
        ...checkin,
        dateFormatted: formatDistance(parseISO(checkin.createdAt), new Date(), {
          addSuffix: true,
          locale: pt,
        }),
      }));

      setCheckins(data);
    } catch (err) {
      Alert.alert('Falha!', 'Não foi possível recuperar check-ins já feitos!');
    }
    setLoading(false);
  }, [studentId]);

  useEffect(() => {
    loadCheckins();
  }, [loadCheckins]);

  async function handleCheckin() {
    try {
      await api.post(`/students/${studentId}/checkins`);

      loadCheckins();
    } catch (err) {
      Alert.alert(
        'Falha!',
        'Você só pode realizar 5 check-ins dentro de 7 dias.'
      );
    }
  }

  return (
    <>
      <Header />

      <Container>
        <CheckinButton loading={loading} onPress={handleCheckin}>
          Novo check-in
        </CheckinButton>

        <CheckinList
          data={checkins}
          keyExtractor={item => String(item.id)}
          renderItem={({ item, index }) => (
            <CheckinItem>
              <CheckinText>Check-in #{index}</CheckinText>
              <CheckinDate>{item.dateFormatted}</CheckinDate>
            </CheckinItem>
          )}
        />
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
