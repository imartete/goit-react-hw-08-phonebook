import PropTypes from 'prop-types';
import './ContactListItem.modules.css';
import { useDispatch } from 'react-redux';
import { removeContact } from 'redux/contacts/contactsSlice';

export const ContactListItem = ({ id, name, number }) => {
  const dispatch = useDispatch();

  function handleRemove() {
    dispatch(removeContact(id));
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
