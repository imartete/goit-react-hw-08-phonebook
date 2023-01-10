import PropTypes from 'prop-types';

export const Filter = ({ searchItemHandler, filter }) => {
  return (
    <input
      type="search"
      name="search"
      onChange={event => searchItemHandler(event.target.value)}
      value={filter}
    ></input>
  );
};

Filter.propTypes = {
  searchItemHandler: PropTypes.func.isRequired,
  filter: PropTypes.string,
};
