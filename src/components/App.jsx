import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button/Button';
import ErrorTitle from './ErrorTitle';
import TitleH1 from './TitleH1';

import { getImages, perPage } from 'services/get_images';
export default class App extends Component {

  state = {
    searchValue: '',
    images: [],
    totalHits: 0,

    isLoading: false,

    currentPage: 1,
    totalPages: 0,
    theEnd: false,

    error: null,
    hasError: false,
  };


  handleSubmit = query => {
    if (this.state.searchValue !== query) {
      this.setState({
        searchValue: query,
        images: [],
        currentPage: 1,
        totalHits: 0,
      });
    }
  };

  addCurrentPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }))
  }

  normalizedData = data => {
    return data.map(({ id, tags, webformatURL, largeImageURL, userImageURL }) => {
      return { id, tags, webformatURL, largeImageURL, userImageURL };
    });
  }

  getImagesFromAPI = async () => {
    try {
      this.setState({ isLoading: true });

      const { searchValue, currentPage } = this.state;
      const data = await getImages(searchValue, currentPage);

      // All right 
      if (data.data.hits.length && currentPage === 1) {
        toast.success(<span>Fined {data.data.totalHits} img for value = {searchValue}</span>, {
          position: toast.POSITION.TOP_LEFT,
          theme: "colored",
        });
      }

      // not found
      if (!data.data.hits.length) {
        return toast.warning(`Sorry image('s) not found...`, {
          position: toast.POSITION.TOP_LEFT,
          theme: "colored",
        });
      }

      //The End
      let theEnd = false;
      if (!data.data.hits.length || data.data.hits.length < 12) theEnd = true;

      const newData = this.normalizedData(data.data.hits);

      this.setState(prevState => ({
        images: [...prevState.images, ...newData],
        totalHits: data.data.totalHits,
        theEnd: theEnd,
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchValue &&
      (prevState.searchValue !== this.state.searchValue ||
        prevState.currentPage !== this.state.currentPage)
    ) {
      this.getImagesFromAPI();
    }
  }

  //================================================================
  render() {
    const { images, totalHits, searchValue, theEnd, isLoading, error, hasError } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleSubmit} />
        {images.length > 0 && <ImageGallery
          images={images}
          searchValue={searchValue}
          totalHits={totalHits} />}
        {isLoading && <Loader />}
        {!theEnd && images.length > 0 && <Button onClick={this.addCurrentPage} />}
        {theEnd && images.length > 0 && <TitleH1 searchValue={"The END"} totalHits={totalHits} />}
        {hasError && <ErrorTitle error={error} />}
        <ToastContainer />
      </>)
  }
}