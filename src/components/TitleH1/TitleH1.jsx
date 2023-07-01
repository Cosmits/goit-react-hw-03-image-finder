import PropTypes from 'prop-types';

const TitleH1 = ({ searchValue, totalHits }) => {
  return (
    <div className="Container">
      <h1 className="TitleH1"> {searchValue}
        <sup style={{ fontSize: "initial" }}> {totalHits} img</sup>
      </h1>
    </div>
  )
}

TitleH1.propTypes = {
  searchValue: PropTypes.string.isRequired,
  totalHits: PropTypes.number.isRequired,
}

export default TitleH1;