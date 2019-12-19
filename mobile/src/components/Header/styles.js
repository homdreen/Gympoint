import styled from 'styled-components/native';

export const Container = styled.View`
  align-self: stretch;

  height: 70px;

  padding: 20px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

export const Image = styled.Image`
  resize-mode: contain;
  margin-left: 10px;
`;
