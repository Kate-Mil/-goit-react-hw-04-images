import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ data, selectedPictureId, onClick }) => {
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

  const selectedPicture = data.find(
    picture => picture.id === selectedPictureId
  );

  if (!selectedPicture) {
    return;
  } // Ранняя проверка, если выбранная картинка не найдена

  const { largeImageURL, tags } = selectedPicture;

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
