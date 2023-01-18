import PropTypes from 'prop-types';
import './ContactListItem.modules.css';
import { useDispatch } from 'react-redux';
import { deleteContact, editContact } from 'redux/contacts/operations';
import { useState } from 'react';

export const ContactListItem = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const [contactName, setContactName] = useState(name);
  const [contactNumber, setContactNumber] = useState(number);
  const [editMode, setEditMode] = useState(false);

  function handleRemove() {
    dispatch(deleteContact(id));
  }

  function handleEdit() {
    setEditMode(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === 'name') setContactName(value);
    if (name === 'number') setContactNumber(value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === 'Escape') {
      if (event.key === 'Enter') {
        // TODO: check if empty
        setContactName(contactName);
        setContactNumber(contactNumber);
        dispatch(editContact({ id, contactName, contactNumber }));
        setEditMode(false);
      }
      setEditMode(false);
    }
  }

  return (
    <li>
      {editMode ? (
        <input
          name="name"
          value={contactName}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></input>
      ) : (
        name
      )}
      :{' '}
      {editMode ? (
        <input
          name="number"
          value={contactNumber}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></input>
      ) : (
        number
      )}
      <button type="button" onClick={handleEdit}>
        Edit
      </button>
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
