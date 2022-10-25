import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { searchImage } from 'api/searchApi';
import { Loader } from 'components/Loader/Loader';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    images: [],
    isLoader: false,
    error: null,
  };

  async componentDidUpdate(prevProps, _) {
    const { imageQuery, page, onLoad, offLoad } = this.props;

    if (prevProps.imageQuery !== imageQuery || prevProps.page !== page) {
      prevProps.imageQuery !== imageQuery
        ? this.setState({ isLoader: true, images: [] })
        : this.setState({ isLoader: true });
      try {
        const response = await searchImage(imageQuery, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          isLoader: false,
        }));

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
        this.setState({ error, isLoader: false });
        toast.error(
          `Ups! Something is wrong :( ${error.message} Try again later!`
        );
      }
    }
  }

  render() {
    const { images, isLoader } = this.state;
    const { onImgClick } = this.props;
    return (
      <>
        <Gallery className="gallery">
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              data={image}
              onImgClick={onImgClick}
            />
          ))}
        </Gallery>

        {isLoader && <Loader />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  imageQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onLoad: PropTypes.func.isRequired,
  offLoad: PropTypes.func.isRequired,
  onImgClick: PropTypes.func.isRequired,
};
