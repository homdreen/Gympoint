import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px;
  margin-top: 20px;
`;

export const TextAreaContainer = styled.View`
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  height: 300px;
  padding: 20px;
`;

export const TextArea = styled.TextInput.attrs({
  multiline: true,
})`
  flex: 1;
  text-align-vertical: top;

  color: #999;
  font-size: 16px;
  line-height: 19px;
`;
