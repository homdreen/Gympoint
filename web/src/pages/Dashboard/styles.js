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
      border: 1px solid #ccc;
      border-radius: 4px;
      display: flex;
      align-items: center;
      margin-left: 15px;
      padding-left: 10px;
      background: #fff;

      svg {
        border: 0;
        height: 36px;
      }

      input {
        font-size: 14px;
        text-align: left;
        margin-left: 10px;
        height: 36px;
        border: 0;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
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

export const StudentsList = styled.div`
  margin: 30px auto;
  background: #fff;
  border-radius: 4px;
  padding: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
