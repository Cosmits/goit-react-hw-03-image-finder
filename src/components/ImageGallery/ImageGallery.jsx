import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem';
import TitleH1 from 'components/TitleH1';


const ImageGallery = ({ images, searchValue, totalHits }) => {
  return (
    <>
      <TitleH1 searchValue={searchValue} totalHits={totalHits}></TitleH1>
      <div className="Container">
        <ul className='ImageGallery'>
          {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </ul>
      </div>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  searchValue: PropTypes.string.isRequired,
  totalHits: PropTypes.number,
};

export default ImageGallery;