import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';

import { Hearts } from 'react-loader-spinner';

export class App extends Component {
  state = {
    page: 1,
    images: [],
    query: '',
    status: 'idle',
    error: null,
  };

  handleSearchSubmit = (value, { resetForm }) => {
    console.log(value);
    this.setState({ query: value });
    resetForm();
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <Hearts
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="hearts-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
}
