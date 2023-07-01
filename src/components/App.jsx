import { Component } from 'react';

import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button/Button';
import { getImages, perPage } from 'services/get_images';
import ErrorTitle from './ErrorTitle';

export default class App extends Component {

  state = {
    searchValue: '',
    images: [],

    isLoading: false,

    currentPage: 1,
    totalPages: 0,

    error: null,
    hasError: false,
  };


  handleSubmit = query => {
    this.setState({
      searchValue: query,
      images: [],
      currentPage: 1,
    });
  };

  addCurrentPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }))
  }

  normalizedData = data => {
    return data.map(({ id, tags, webformatURL, largeImageURL }) => {
      return { id, tags, webformatURL, largeImageURL };
    });
  }

  getImagesFromAPI = async () => {
    try {
      this.setState({ isLoading: true });


      const { searchValue, currentPage } = this.state;
      const data = await getImages(searchValue, currentPage);


      // if (!data.data.hits.length ) {
      //   // // Если изображения не найдены, выводим сообщение
      //   // return toast.info('Sorry image not found...', {
      //   //   position: toast.POSITION.TOP_RIGHT,
      //   // });
      // }

      const newData = this.normalizedData(data.data.hits);

      this.setState(prevState => ({
        images: [...prevState.images, ...newData],
        isLoading: false,
        totalPages: Math.trunc(data.totalHits / perPage),
        error: null,
      }));
    } catch (error) {
      this.setState({ hasError: true, error: error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  //================================================================
  // componentDidMount() {
  // const contacts = loadLocalStorage();
  // if (contacts) this.setState({ contacts });
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchValue &&
      (prevState.searchValue !== this.state.searchValue ||
        prevState.currentPage !== this.state.currentPage)
    ) {
      this.getImagesFromAPI();
    }
  }


  componentDidCatch(error, info) {
    // Якщо метод був викликаний, отже, є помилка!
    // Встановлюємо стан
    this.setState({ hasError: true, error: error });
    // Також можна надіслати звіт про помилку вашому аналітичному сервісу
    // logErrorToMyService(error, info);
  }

  //================================================================
  render() {
    const { images, searchValue, isLoading, error, hasError } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleSubmit} />
        {images.length > 0 && <ImageGallery images={images} searchValue={searchValue} />}
        {isLoading && <Loader />}
        {images.length > 0 && <Button onClick={this.addCurrentPage} />}
        {hasError && <ErrorTitle error={error} />}
      </>)
  }
}