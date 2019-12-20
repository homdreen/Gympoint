import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px;
  margin-top: 20px;
`;

export const NewHelpOrderButton = styled(Button)`
  align-self: stretch;
`;

export const HelpOrdersList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const HelpOrderItem = styled.View`
  padding: 20px;

  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;

  margin-bottom: 10px;
`;

export const HelpOrderAnswered = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HelpOrderAnsweredText = styled.Text`
  margin-left: 10px;

  color: ${props => (props.answered ? 'rgb(0,255,0)' : '#ddd')};
`;

export const ItemHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Question = styled.Text`
  margin-top: 16px;
`;
