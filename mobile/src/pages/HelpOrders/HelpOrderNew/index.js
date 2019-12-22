import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Button from '~/components/Button';

import { Container, TextAreaContainer, TextArea } from './styles';

export default function HelpOrderNew({ navigation }) {
  const { goBack } = navigation;
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const studentId = useSelector(state => state.user.id);

  async function handleSubmit() {
    setLoading(true);

    try {
      await api.post(`/students/${studentId}/help-orders`, {
        question,
      });

      setLoading(false);
      Alert.alert(
        'Sucesso!',
        'Seu pedido de auxílio foi enviado, em breve nossa equipe irá respondê-lo.',
        [
          {
            onPress: () => goBack(),
          },
        ]
      );
    } catch (err) {
      Alert.alert(
        'Falha!',
        'Não foi possível enviar seu pedido de auxílio, tente novamente mais tarde.'
      );
    }

    setLoading(false);
  }

  return (
    <Background>
      <Header />

      <Container>
        <TextAreaContainer>
          <TextArea
            placeholder="Inclua seu pedido de auxílio"
            autoCorrect
            value={question}
            onChangeText={setQuestion}
          />
        </TextAreaContainer>
        <Button loading={loading} onPress={handleSubmit}>
          Enviar Pedido
        </Button>
      </Container>
    </Background>
  );
}

HelpOrderNew.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
