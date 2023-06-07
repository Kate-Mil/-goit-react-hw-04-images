import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ modalData, onClick }) => {
  useEffect(() => {
    const hendleKeyDown = e => {
      if (e.code === 'Escape') {
        onClick();
      }
    };
    window.addEventListener('keydown', hendleKeyDown);

    return () => {
      window.removeEventListener('keydown', hendleKeyDown);
    };
  }, [onClick]);

  const hendleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClick();
    }
  };

  const { largeImageURL, tags } = modalData;

  return createPortal(
    <Overlay onClick={hendleOverlayClick}>
      <ModalContent>
        <img src={largeImageURL} alt={tags} />
      </ModalContent>
    </Overlay>,
    modalRoot
  );
};

export default Modal;
