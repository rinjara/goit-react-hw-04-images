import { searchImage } from 'api/searchApi';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Component } from 'react';
import { toast } from 'react-toastify';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    page: 1,
    images: [],
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, _) {
    if (prevProps.imageQuery !== this.props.imageQuery) {
      this.setState({ status: 'pending', page: 1 });
      searchImage(this.props.imageQuery)
        .then(images =>
          this.setState({ images: images.hits, status: 'resolved' })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { images, error, status } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return toast.error(
        `Something wrong! :( Please, try again later. ${error.message}`
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <Gallery className="gallery">
            {images.map(image => (
              <ImageGalleryItem key={image.id} data={image} />
            ))}
          </Gallery>
          <Button />
        </>
      );
    }
  }
}
