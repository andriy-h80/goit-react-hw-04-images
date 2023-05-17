import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyled, ModalImage, ModalDescr } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, largeImageURL, tags }) {
  
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown());

    return () => {
      window.removeEventListener('keydown', handleKeyDown());
    }
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

    // const { largeImageURL, tags } = props.modalData;

    return createPortal(
      <Overlay onClick={handleBackdropClick()}>
        <ModalStyled >
          <ModalImage src={largeImageURL} alt={tags} />
          <ModalDescr>{tags}</ModalDescr>
        </ModalStyled>
      </Overlay>,
      modalRoot
    );
  }

Modal.propTypes = {
  modalData: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func,
};
