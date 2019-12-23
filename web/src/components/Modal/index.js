import React from 'react';
import PropTypes from 'prop-types';

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

ModalComponent.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

ModalComponent.defaultProps = {
  show: false,
};
