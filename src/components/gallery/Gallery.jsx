import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';

const Gallery = ({ images }) => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    if (currentImage < galleryImages.length - 1) {
      setCurrentImage((prev) => prev + 1);
    } else {
      setCurrentImage(0);
    }
  };

  const previousImage = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    } else {
      setCurrentImage(galleryImages.length - 1);
    }
  };

  useEffect(() => {
    setGalleryImages(images);
  }, [images]);

  return (
    <div className='gallery'>
      <div className='overlay'>
        <div className='arrow left' onClick={previousImage}>
          <Icon icon='IoChevronBack' />
        </div>
        <div className='navigation'>
          {galleryImages.map((image, index) => {
            return (
              <div
                className={index === currentImage ? 'dot active' : 'dot'}
                key={index}
                onClick={() => setCurrentImage(index)}
              ></div>
            );
          })}
        </div>
        <div className='arrow right' onClick={nextImage}>
          <Icon icon='IoChevronForward' />
        </div>
      </div>

      <div
        className='image-container'
        style={{ transform: `translateX(${-currentImage * 100}%)` }}
      >
        {galleryImages.map((image, index) => {
          return <img className='image' key={index} src={image}></img>;
        })}
      </div>
    </div>
  );
};
Gallery.propTypes = {
  images: PropTypes.array.isRequired,
};
export default Gallery;
