import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastNotifications } from './Notifications/Notifications';
import { AppBox } from './App.styled';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    loadMore: false,
    modalImg: null,
  };

  handleSearchSubmit = value => {
    this.setState({ query: value, page: 1 });
  };

  handleButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onLoadMore = () => {
    this.setState({ loadMore: true });
  };

  offLoadMore = () => {
    this.setState({ loadMore: false });
  };

  setModalImg = image => {
    this.setState({ modalImg: image });
  };

  clearModalImg = () => {
    this.setState({ modalImg: null });
  };

  render() {
    const { query, page, loadMore, modalImg } = this.state;
    const {
      handleSearchSubmit,
      handleButtonClick,
      onLoadMore,
      offLoadMore,
      setModalImg,
      clearModalImg,
    } = this;

    return (
      <AppBox>
        <Searchbar onSubmit={handleSearchSubmit} />

        <ToastNotifications />

        <ImageGallery
          imageQuery={query}
          page={page}
          onLoad={onLoadMore}
          offLoad={offLoadMore}
          onImgClick={setModalImg}
        />

        {loadMore && <Button onClick={handleButtonClick}>Load more</Button>}

        {modalImg && <Modal modalImg={modalImg} onClose={clearModalImg} />}
      </AppBox>
    );
  }
}
