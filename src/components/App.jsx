import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastNotifications } from './Notifications/Notifications';
import { AppBox } from './App.styled';
import { Button } from './Button/Button';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  const handleSearchSubmit = value => {
    setQuery(value);
    setPage(1);
  };

  const handleButtonClick = () => {
    setPage(state => state + 1);
  };

  return (
    <AppBox>
      <Searchbar onSubmit={handleSearchSubmit} />

      <ToastNotifications />

      <ImageGallery
        imageQuery={query}
        page={page}
        onLoad={() => setLoadMore(true)}
        offLoad={() => setLoadMore(false)}
      />

      {loadMore && <Button onClick={handleButtonClick}>Load more</Button>}
    </AppBox>
  );
};
