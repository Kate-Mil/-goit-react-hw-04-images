import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ url, alt, onClick }) {
  return (
    <GalleryItem>
      <GalleryItemImage src={url} alt={alt} onClick={onClick} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
