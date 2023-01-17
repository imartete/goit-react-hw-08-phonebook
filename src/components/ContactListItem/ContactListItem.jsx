import PropTypes from 'prop-types';
import './ContactListItem.modules.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/operations';

export const ContactListItem = ({ id, name, number }) => {
  const dispatch = useDispatch();

  function handleRemove() {
    dispatch(deleteContact(id));
  }

  return (
    <li>
      {name}: {number}
      <button type="button" onClick={handleRemove} className="button-delete">
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
