import React, { useState, useCallback, useEffect } from 'react';
import { Alert, Text } from 'react-native';
import { formatDistance, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
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
  HelpOrderDate,
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
        answered: !!helpOrder.answer,
        requestWhenFormatted: formatDistance(
          parseISO(helpOrder.createdAt),
          new Date(),
          {
            addSuffix: true,
            locale: pt,
          }
        ),
      }));

      console.tron.log(data);

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
            <HelpOrderItem
              onPress={() => {
                console.tron.log('clicoou, que delciia');
              }}
            >
              <ItemHeader>
                <HelpOrderAnswered>
                  {item.answered ? (
                    <>
                      <Icon name="check-circle" size={16} color="#42cb59" />
                      <HelpOrderAnsweredText answered={item.answered}>
                        Respondido
                      </HelpOrderAnsweredText>
                    </>
                  ) : (
                    <>
                      <Icon name="check-circle" size={16} color="#999" />
                      <HelpOrderAnsweredText answered={item.answered}>
                        Sem resposta
                      </HelpOrderAnsweredText>
                    </>
                  )}
                </HelpOrderAnswered>
                <HelpOrderDate>{item.requestWhenFormatted}</HelpOrderDate>
              </ItemHeader>
              <Question onPress={() => console.tron.log('clicou, que delicia')}>
                <Text>{item.question}</Text>
              </Question>
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
