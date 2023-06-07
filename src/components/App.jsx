import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { Container } from './App.styled';
import * as ImageService from '../services/image-api';
import Modal from './Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalPictures, setTotalPictures] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError('');

        const data = await ImageService.fetchImage(query, page);

        const pictures = data.hits.map(
          ({ id, webformatURL, tags, largeImageURL }) => ({
            id,
            webformatURL,
            tags,
            largeImageURL,
          })
        );

        setPictures(prevPictures => [...prevPictures, ...pictures]);
        setTotalPictures(data.totalHits);
      } catch (error) {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const formSubmitHandler = searchForm => {
    setQuery(searchForm);
    setPictures([]);
    setPage(1);
    setTotalPictures(0);
  };

  const incrementPage = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = modalData => {
    setShowModal(!showModal);
    setModalData(modalData);
  };

  const showButton = pictures.length !== totalPictures && !isLoading;

  return (
    <>
      <Container>
        <Searchbar onSubmit={formSubmitHandler} />
        {pictures.length > 0 && (
          <ImageGallery data={pictures} onClick={toggleModal} />
        )}
        {error && <p>{error}</p>}
        {isLoading && <Loader />}
        {showButton && <Button onClick={incrementPage} />}
        {showModal && <Modal modalData={modalData} onClick={toggleModal} />}
      </Container>
    </>
  );
};

export default App;
