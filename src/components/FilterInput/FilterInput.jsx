import PropTypes from 'prop-types';
import { Label, Input } from './FilterInput.styled';

const FilterInput = ({ value, onChangeFilter }) => {
  return (
    <Label>
      Find contacts by name
      <Input
        type="text"
        name="filter"
        placeholder="Enter contact name"
        value={value}
        onChange={onChangeFilter}
      />
    </Label>
  );
};

FilterInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default FilterInput;