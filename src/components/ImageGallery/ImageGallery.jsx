import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem';


const ImageGallery = ({ images }) => {
  return (
    <div className="Container">
      <ul className='ImageGallery'>
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image} />
        ))}
      </ul>
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  searchValue: PropTypes.string.isRequired,
};

export default ImageGallery;