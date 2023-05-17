import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Container } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default function App() {
  const [value, setValue] = useState('')

  const handleSearchFormSubmit = searchFormValue => {
    setValue(searchFormValue);
  }
  
    return (
      <Container>
      <Searchbar onSearchFormSubmit={handleSearchFormSubmit}/>
      <ImageGallery imageSearchName={value} /> 
      <ToastContainer position="top-center" autoClose={3000}/>
      </Container>
    );
};
