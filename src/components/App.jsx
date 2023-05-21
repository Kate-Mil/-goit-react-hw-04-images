import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { Container } from './App.styled';
import * as ImageService from '../services/image-api';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    query: '',
    page: 1,
    pictures: [],
    isLoading: false,
    error: false,
    totalPictures: 0,
    showModal: false,
    selectedPictureId: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true, error: '' });
        const data = await ImageService.fetchImage(query, page);

        const pictures = data.hits.map(
          ({ id, webformatURL, tags, largeImageURL }) => {
            return {
              id,
              webformatURL,
              tags,
              largeImageURL,
            };
          }
        );

        this.setState(prevState => {
          return {
            pictures: [...prevState.pictures, ...pictures],
            totalPictures: data.totalHits,
          };
        });
      } catch (error) {
        this.setState({ error: 'Something went wrong' });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  formSubmitHandler = searchForm => {
    this.setState({
      query: searchForm,
      pictures: [],
      page: 1,
      totalPictures: 0,
    });
  };

  incrementPage = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  toggleModal = pictureId => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      selectedPictureId: pictureId,
    }));
  };

  render() {
    const {
      pictures,
      error,
      totalPictures,
      isLoading,
      showModal,
      selectedPictureId,
    } = this.state;

    const showButton = pictures.length !== totalPictures && !isLoading;

    return (
      <>
        <Container>
          <Searchbar onSubmit={this.formSubmitHandler} />
          {pictures.length > 0 && (
            <ImageGallery data={pictures} onClick={this.toggleModal} />
          )}
          {error && <p>{error}</p>}
          {isLoading && <Loader />}
          {showButton && <Button onClick={this.incrementPage} />}
          {showModal && (
            <Modal
              data={pictures}
              selectedPictureId={selectedPictureId}
              onClick={this.toggleModal}
            />
          )}
        </Container>
      </>
    );
  }
}

export default App;
