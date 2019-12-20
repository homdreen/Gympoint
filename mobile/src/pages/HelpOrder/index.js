import React, { useState, useCallback, useEffect } from 'react';
import { Alert, Text } from 'react-native';
import { useSelector } from 'react-redux';

import Icon from '@expo/vector-icons/MaterialIcons';

import api from '~/services/api';

import Header from '~/components/Header';
import {
  Container,
  NewHelpOrderButton,
  HelpOrdersList,
  HelpOrderItem,
  HelpOrderAnswered,
  ItemHeader,
  Question,
  HelpOrderAnsweredText,
} from './styles';

export default function HelpOrder() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const studentId = useSelector(state => state.user.id);

  const loadHelpOrders = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get(`/students/${studentId}/help-orders`);

      const data = response.data.map(helpOrder => ({
        ...helpOrder,
      }));

      setHelpOrders(data);
    } catch (err) {
      Alert.alert('Falha!', 'Não foi possível recuperar os pedidos de auxílio');
    }

    setLoading(false);
  }, [studentId]);

  useEffect(() => {
    loadHelpOrders();
  }, [loadHelpOrders]);

  return (
    <>
      <Header />

      <Container>
        <NewHelpOrderButton loading={loading}>
          Novo pedido de auxílio
        </NewHelpOrderButton>

        <HelpOrdersList
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <HelpOrderItem>
              <ItemHeader>
                <HelpOrderAnswered>
                  <Icon name="check-circle" size={20} color="#000" />
                  <HelpOrderAnsweredText answered={!!item.answer}>
                    Respondido
                  </HelpOrderAnsweredText>
                </HelpOrderAnswered>
                <Text>há 2 dias</Text>
              </ItemHeader>
              <Question>Isso é daora</Question>
            </HelpOrderItem>
          )}
        />
      </Container>
    </>
  );
}

HelpOrder.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};
