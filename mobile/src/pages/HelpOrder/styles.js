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

export const ItemHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HelpOrderAnsweredText = styled.Text`
  margin-left: 5px;
  font-weight: bold;
  font-size: 14px;

  color: ${props => (props.answered ? '#42cb59' : '#999')};
`;

export const HelpOrderDate = styled.Text`
  color: #666;
  text-align: right;
  font-size: 14px;
  line-height: 17px;
`;

export const Question = styled.TouchableOpacity`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  line-height: 26px;
  text-align: left;
`;
