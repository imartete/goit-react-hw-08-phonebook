import PropTypes from 'prop-types';
import { ContactListItem } from '../ContactListItem/ContactListItem';
import './ContactList.modules.css';

export const ContactList = ({ contacts }) => {
  return (
    <ul>
      {contacts.map(contact => (
        <ContactListItem
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
