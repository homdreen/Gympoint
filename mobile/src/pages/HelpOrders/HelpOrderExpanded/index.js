import React from 'react';
import PropTypes from 'prop-types';

import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  Container,
  HelpOrderContent,
  HelpOrderHeader,
  SectionTitle,
  HelpOrderDate,
  HelpOrderText,
} from './styles';

export default function HelpOrderExpanded({ navigation }) {
  const helpOrder = navigation.getParam('helpOrder', null);

  console.tron.log(helpOrder);

  return (
    <Background>
      <Header />

      <Container>
        <HelpOrderContent>
          <HelpOrderHeader>
            <SectionTitle>PERGUNTA</SectionTitle>
            <HelpOrderDate>{helpOrder.requestWhenFormatted}</HelpOrderDate>
          </HelpOrderHeader>
          <HelpOrderText>{helpOrder.question}</HelpOrderText>
          <SectionTitle>RESPOSTA</SectionTitle>
          <HelpOrderText>
            {helpOrder.answer
              ? helpOrder.answer
              : 'Sem respostas até o momento'}
          </HelpOrderText>
        </HelpOrderContent>
      </Container>
    </Background>
  );
}

HelpOrderExpanded.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
