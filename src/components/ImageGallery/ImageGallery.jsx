import { useState, useEffect } from 'react';
import ErrorImageView from '../ErrorImageView/ErrorImageView';
import getImages from '../../services/fetchAPI';
import Loader from '../Loader/Loader';
import { ImageGalleryStyled, Text } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';

export default function ImageGallery({ imageSearchName }) {
    const [searchName, setSearchName] = useState('');
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('idle');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ img: '', tags: '' });

    useEffect(() => {
   
        if (searchName !== imageSearchName) {
            setImages([]);
            setPage(1);
            setStatus('pending');       
        }

        if (searchName !== imageSearchName || page !== 1) {
            getImages(imageSearchName, page)
            .then(images => {
                setImages(prevImages => (page === 1 ? images.hits : [...prevImages, ...images.hits]));
                setTotalPages(Math.ceil(images.totalHits / 12));
                setStatus('resolved');
            })    
            .catch(error => {
                setError(error);
                setStatus('rejected');
            })
        }  
    }, [searchName, page, imageSearchName]) 

    const handleLoadMore = () => {
        setPage(prev => (prev + 1 ));
        setSearchName(imageSearchName);
    };

    const receivedModalData = modalData => {
        setModalData(modalData);
        setShowModal(true);
    };
    
    const handleModalClose = () => {
        setShowModal(false);
    };
   
        if (status === 'idle') {
            return <Text>Let's try find something!</Text>;
        }
      
        if (status === 'pending') {
            return <Loader />;
        }

        if (status === 'rejected') {
            return <ErrorImageView message={error.message} />;
        }

        if (images.length === 0) {
            return <ErrorImageView message={`Sorry, we can't find ${imageSearchName}`} />;
        }

        if (status === 'resolved') {
            return (
                <>
                <ImageGalleryStyled>
                    {images.map(image => (
                        <ImageGalleryItem
                            key={image.id}
                            webformatURL={image.webformatURL}
                            tags={image.tags}
                            largeImageURL={image.largeImageURL}
                            onImageClick={() => receivedModalData({ img: image.largeImageURL, tags: image.tags })}
                        />
                    ))}
                </ImageGalleryStyled>
                {images.length > 0 && status !== 'pending' && page <= totalPages && (
                    <Button onClick={handleLoadMore}>Load More</Button>
                )}
                {showModal && (
                    <Modal modalData={modalData} onClose={handleModalClose} />
                )}
                </>
            )
        }
}

ImageGallery.propTypes = {
    imageSearchName: PropTypes.string.isRequired,
}
