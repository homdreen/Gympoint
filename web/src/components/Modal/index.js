import React from 'react';

import { Modal, ShowModal, HideModal, Container } from './styles';

export default function ModalComponent({ show, children }) {
  return (
    <>
      {show ? (
        <ShowModal>
          <Modal>
            <Container>{children}</Container>
          </Modal>
        </ShowModal>
      ) : (
        <HideModal>
          <Modal>
            <Container>{children}</Container>
          </Modal>
        </HideModal>
      )}
    </>
  );
}
