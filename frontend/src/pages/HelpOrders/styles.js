import styled from 'styled-components';

import { darken } from 'polished';

export const Container = styled.div`
  max-width: 700px;
  margin: 20px auto;
`;

export const HelpOrdersList = styled.div`
  margin: 30px auto;
  background: #fff;
  border-radius: 4px;
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HelpOrdersTable = styled.table`
  width: 100%;

  thead th {
    width: 100%;

    padding: 12px 0;
    text-align: left;

    color: #444;
    font-size: 16px;
  }

  tbody td {
    padding: 12px 0;
    vertical-align: middle;
    border-bottom: 1px solid #eee;

    color: #666;
    font-size: 16px;
  }

    button {
      font-size: 15px;
      line-height: 18px;
      background: none;
      border: 0;
      color: #4D85EE;
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: ${darken(0.12, '#4D85EE')};
      }
    }
  }
`;

export const ModalContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      margin-top: 5px;
      font-size: 14px;
      font-weight: bold;
      color: #ee4d64;
    }

    textarea {
      width: 100%;
      height: 150px;

      border-radius: 4px;
      padding: 10px;
    }
  }
`;

export const Title = styled.h1`
  font-size: 14px;
  font-weight: bold;
  color: #444;

  margin-bottom: 8px;
`;

export const Question = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 26px;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  width: 100%;
  border: 0;
  margin-top: 21px;
  height: 45px;
  background: #ee4d64;
  border-radius: 4px;
  transition: background 0.2s;

  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;

  &:hover {
    background: ${darken(0.12, '#EE4D64')};
  }
`;
