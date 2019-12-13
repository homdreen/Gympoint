import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1200px;
  margin: 20px auto;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  aside {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    form {
      display: flex;
      align-items: center;
      margin-left: 15px;

      input {
        height: 36px;
        border: 0;
      }
    }
  }
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 0;
  border-radius: 4px;
  height: 36px;
  background: #ee4d64;
  padding: 10px;

  color: #fff;
  font-size: 14px;
  font-weight: bold;

  transition: background 0.2s;

  svg {
    margin-right: 5px;
  }

  &:hover {
    background: ${darken(0.12, '#ee4d64')};
  }
`;
