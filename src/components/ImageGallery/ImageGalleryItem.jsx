import { GalleryImg, GalleryItem } from './ImageGallery.styled';

export const ImageGalleryItem = ({ data }) => {
  return (
    <GalleryItem>
      <GalleryImg src={data.webformatURL} alt={data.tags} />
    </GalleryItem>
  );
};
