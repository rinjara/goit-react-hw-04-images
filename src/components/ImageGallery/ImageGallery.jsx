import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { searchImage } from 'api/searchApi';
import { Loader } from 'components/Loader/Loader';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ imageQuery, page, onLoad, offLoad }) => {
  const [images, setImages] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [errorState, setErrorState] = useState(null);

  useEffect(() => {
    setImages([]);
  }, [imageQuery]);

  useEffect(() => {
    if (!imageQuery) {
      return;
    }

    (async () => {
      setIsLoader(true);

      try {
        const response = await searchImage(imageQuery, page);

        page === 1
          ? setImages(response.hits)
          : setImages(state => [...state, ...response.hits]);

        if (!response.hits.length) {
          offLoad();
          toast.error(`There is no "${imageQuery}" images.`);
        } else if (response.hits.length < 12 && response.hits.length > 0) {
          offLoad();
          toast('There is no more images');
        } else {
          onLoad();
        }
      } catch (error) {
        setErrorState(error.message);
        toast.error(
          `Ups! Something is wrong :( ${errorState} Try again later!`
        );
      } finally {
        setIsLoader(false);
      }
    })();
  }, [errorState, imageQuery, offLoad, onLoad, page]);

  return (
    <>
      <Gallery className="gallery">
        {images.map(image => (
          <ImageGalleryItem key={image.id} data={image} />
        ))}
      </Gallery>

      {isLoader && <Loader />}
    </>
  );
};

ImageGallery.propTypes = {
  imageQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onLoad: PropTypes.func.isRequired,
  offLoad: PropTypes.func.isRequired,
};
