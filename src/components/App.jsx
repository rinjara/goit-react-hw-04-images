import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastNotifications } from './Notifications/Notifications';
import { AppBox } from './App.styled';

// import { searchImage } from 'api/searchApi';
// import { Loader } from './Loader/Loader';
// import { Button } from './Button/Button';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    // images: [],
    // error: null,
    // status: 'idle',
  };

  // componentDidUpdate(prevProps, _) {
  // if (prevProps.query !== this.state.query) {
  // this.setState({ status: 'pending', page: 1 });
  // }
  // }

  // fetchImages = query => {
  //   searchImage(query)
  //     .then(images =>
  //       this.setState({ images: images.hits, status: 'resolved' })
  //     )
  //     .catch(error => this.setState({ error, status: 'rejected' }));
  // };

  handleSearchSubmit = value => {
    this.setState({ query: value.query });
    // this.fetchImages(value.query);

    // const data = await searchImage(value);
    // console.log(data);
    // this.setState(state => ({
    //   images: [...state.images, ...data.hits],
    // }));
    // resetForm();
  };

  render() {
    return (
      <AppBox>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ToastNotifications />
        <ImageGallery imageQuery={this.state.query} />
      </AppBox>
    );
  }
}
