import styled from 'styled-components';

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
`;

export const Container = styled.div`
  position: fixed;
  background: #fff;
  width: 25%;
  height: auto;
  padding: 30px;
  border-radius: 4px;

  left: 38%;
  top: 25%;
`;

export const ShowModal = styled.div`
  display: block;
`;

export const HideModal = styled.div`
  display: none;
`;
