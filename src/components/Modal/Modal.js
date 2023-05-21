import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleKeyDown);
  }

  hendleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClick();
    }
  };

  hendleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClick();
    }
  };

  render() {
    const { data, selectedPictureId } = this.props;
    const selectedPicture = data.find(
      picture => picture.id === selectedPictureId
    );

    if (!selectedPicture) {
      return;
    } // Ранняя проверка, если выбранная картинка не найдена

    const { largeImageURL, tags } = selectedPicture;

    return createPortal(
      <Overlay onClick={this.hendleOverlayClick}>
        <ModalContent>
          <img src={largeImageURL} alt={tags} />
        </ModalContent>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
