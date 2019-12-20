import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px;
  margin-top: 20px;
`;

export const CheckinButton = styled(Button)`
  align-self: stretch;
`;

export const CheckinList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const CheckinItem = styled.View`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 20px 15px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #444;
  margin-bottom: 10px;
`;

export const CheckinText = styled.Text`
  color: #444;
  font-size: 14px;
  line-height: 16px;
  font-weight: bold;
`;

export const CheckinDate = styled.Text`
  width: 50%;

  text-align: right;
  font-size: 14px;
  line-height: 17px;
  color: #666;
`;
