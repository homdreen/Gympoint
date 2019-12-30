import styled from 'styled-components';
import { Form } from '@rocketseat/unform';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
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
  }
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 16px;
  border: 0;
  border-radius: 4px;
  height: 36px;
  background: ${props => props.color};
  padding: 10px;

  color: #fff;
  font-size: 14px;
  font-weight: bold;

  transition: background 0.2s;

  svg {
    margin-right: 5px;
  }

  &:hover {
    background: ${props => darken(0.12, props.color)};
  }
`;

export const FormContent = styled(Form)`
  margin: 30px auto;
  max-width: 900px;
  padding: 20px;
  background: #fff;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    font-weight: bold;
    color: #ee4d64;
  }

  div {
    margin-top: 15px;
    width: 100%;

    p {
      font-size: 14px;
      font-weight: bold;
    }

    input {
      font-size: 16px;
      height: 45px;
      margin-top: 8px;
      color: #666;
      width: 100%;
      padding: 5px;
      border: 1px solid #ddd;
      border-radius: 4px;

      transition: border 0.2s cubic-bezier(0.39, 0.575, 0.565, 1);

      &:focus {
        border: 2px solid #ee4d64;
      }
    }
  }
`;

export const LastRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LastRowItem = styled.div`
  padding: 0 4px;
`;
