import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastNotifications } from './Notifications/Notifications';
import { AppBox } from './App.styled';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    loadMore: false,
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

  render() {
    const { query, page, loadMore } = this.state;
    const { handleSearchSubmit, handleButtonClick, onLoadMore, offLoadMore } =
      this;

    return (
      <AppBox>
        <Searchbar onSubmit={handleSearchSubmit} />

        <ToastNotifications />

        <ImageGallery
          imageQuery={query}
          page={page}
          onLoad={onLoadMore}
          offLoad={offLoadMore}
        />

        {loadMore && <Button onClick={handleButtonClick}>Load more</Button>}
      </AppBox>
    );
  }
}
