import { useSelector } from 'react-redux';
import { ContactListItem } from './ContactListItem';
import { selectVisibleContacts } from 'redux/selectorsGlobal';
import { List } from '@mantine/core';

export function ContactList() {
  const visibleContacts = useSelector(selectVisibleContacts);

  return (
    <List sx={{ marginTop: 20 }} listStyleType="none">
      {visibleContacts.map(contact => (
        <ContactListItem
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
        />
      ))}
    </List>
  );
}
