import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class ImageGalleryItem extends Component {

  state = {
    isOpenModal: false,
  };

  toggleModal = () => {
    this.setState(({ isOpenModal }) => ({
      isOpenModal: !isOpenModal,
    }));
  };

  render() {
    const { image: { tags, webformatURL, largeImageURL } } = this.props;
    const { isOpenModal } = this.state;
    return (
      <li className="ImageGalleryItem">
        <img className="ImageGalleryItem-image"
          src={webformatURL}
          alt={tags}
          onClick={this.toggleModal} />
        {isOpenModal && (
          <Modal
            tags={tags}
            largeImageURL={largeImageURL}
            onCloseModal={this.toggleModal}
          />
        )}
      </li>
    )
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    userImageURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};