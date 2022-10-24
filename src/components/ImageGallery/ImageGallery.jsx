import { Component } from 'react';
import { toast } from 'react-toastify';
import { searchImage } from 'api/searchApi';
import { Loader } from 'components/Loader/Loader';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    images: [],
    // modalImg: '',
    isLoader: false,
    // isModal: false,
    error: null,
  };

  async componentDidUpdate(prevProps, _) {
    const { imageQuery, page, onLoad, offLoad } = this.props;

    if (prevProps.imageQuery !== imageQuery) {
      this.setState({ isLoader: true, images: [] });
      try {
        const response = await searchImage(imageQuery, page);
        this.setState({ images: response.hits, isLoader: false });

        if (!response.hits.length) {
          offLoad();
          toast.error(`There is no "${imageQuery}" images.`);
        }
        if (response.hits.length < 12) {
          offLoad();
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

    if (prevProps.imageQuery === imageQuery && prevProps.page !== page) {
      this.setState({ isLoader: true });
      try {
        const response = await searchImage(imageQuery, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          isLoader: false,
        }));
        if (!response.hits.length || response.hits.length < 12) {
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
    return (
      <>
        <Gallery className="gallery">
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              data={image}
              onImgClick={this.props.onImgClick}
            />
          ))}
        </Gallery>

        {isLoader && <Loader />}
      </>
    );
  }
}
