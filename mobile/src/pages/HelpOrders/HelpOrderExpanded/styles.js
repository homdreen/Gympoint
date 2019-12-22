import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px;
  margin-top: 20px;
`;

export const HelpOrderContent = styled.View`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
`;
export const HelpOrderHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SectionTitle = styled.Text`
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: #444;
`;

export const HelpOrderDate = styled.Text`
  width: 60%;

  text-align: right;
  font-size: 14px;
  line-height: 17px;
  color: #666;
`;

export const HelpOrderText = styled.Text`
  margin-top: 16px;
  margin-bottom: 20px;

  font-size: 14px;
  line-height: 26px;
  color: #666;
`;
