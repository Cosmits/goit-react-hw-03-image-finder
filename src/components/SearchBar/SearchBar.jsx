import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ReactComponent as SearchIcon } from '../../icons/search.svg'

export default class SearchBar extends Component {
  state = {
    searchQuery: '',
  }

  handleChange = event => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const searchQuery = event.target.elements.searchName.value.trim().toLowerCase();
    if (searchQuery) {
      this.props.onSubmit(searchQuery);
      event.target.reset();
    }
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className="SearchBar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            {/* <span className="SearchForm-button-label">Search</span> */}
            <SearchIcon />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchName"
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
        </form>
      </header>
    )
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
};