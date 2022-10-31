import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { GalleryImg, GalleryItem } from './ImageGallery.styled';

export const ImageGalleryItem = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { webformatURL, tags, largeImageURL } = data;

  return (
    <GalleryItem>
      <GalleryImg
        src={webformatURL}
        alt={tags}
        onClick={() => {
          setIsModalOpen(true);
        }}
      />
      {isModalOpen && (
        <Modal modalImg={largeImageURL} onClose={() => setIsModalOpen(false)} />
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  data: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
