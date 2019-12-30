import styled from 'styled-components';
import { darken } from 'polished';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1440px;
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    div {
      display: flex;
      flex-direction: row;
      align-items: center;

      padding-right: 30px;
      margin-right: 30px;
      border-right: 1px solid #ddd;

      img:nth-child(1) {
        width: 44px;

        &:hover {
          -webkit-animation: rotate-center 0.6s ease-in-out both;
          animation: rotate-center 0.6s ease-in-out both;
        }
      }

      img:nth-child(2) {
        margin-left: 5px;
        width: 78px;
      }
    }

    @keyframes rotate-center {
      0% {
        -webkit-transform: rotate(0);
        transform: rotate(0);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
  }

  aside {
    p {
      font-size: 14px;
      font-weight: bold;
      color: #666;
    }

    span {
      color: #de3b3b;
      font-size: 14px;
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: ${darken(0.12, '#DE3B3B')};
      }
    }
  }
`;

export const LinkElement = styled(NavLink)`
  margin-right: 20px;
  color: #999;
  font-size: 15px;
  font-weight: bold;
  transition: color 0.2s;

  &:hover {
    color: ${props =>
      props.active ? darken(0.03, '#DE3B3B') : darken(0.3, '#999')};
  }
`;
