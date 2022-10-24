import { GalleryImg, GalleryItem } from './ImageGallery.styled';

export const ImageGalleryItem = ({ data, onImgClick }) => {
  return (
    <GalleryItem>
      <GalleryImg
        src={data.webformatURL}
        alt={data.tags}
        onClick={() => {
          onImgClick(data.largeImageURL);
        }}
      />
    </GalleryItem>
  );
};
