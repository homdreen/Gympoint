import styled from 'styled-components';

import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;
  background: #ee4d64;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;

  width: 360px;
  max-width: 415px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  padding: 20px;

  p {
    font-weight: bold;
    font-size: 14px;
    color: #444444;
    text-align: left;
    margin-bottom: 8px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: #fff;
      border: 1px solid #999999;
      border-radius: 4px;
      height: 45px;
      margin-bottom: 20px;
      padding: 10px;
    }
  }

  button {
    height: 45px;
    font-size: 16px;
    background: #ee4d64;
    border: 0;
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.1, '#ee4d64')};
    }
  }
`;

export const BoxLogo = styled.div`
  display: flex;
  flex-direction: column;

  img {
    margin-bottom: 10px;
  }
`;
