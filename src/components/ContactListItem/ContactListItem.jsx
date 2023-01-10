import PropTypes from 'prop-types';
import './ContactListItem.modules.css';

export const ContactListItem = ({ id, name, number, onClick }) => {
  return (
    <li>
      {name}: {number}
      <button
        type="button"
        onClick={() => onClick(id)}
        className="button-delete"
      >
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
