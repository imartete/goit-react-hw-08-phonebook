import React from 'react';
import { useSelector } from 'react-redux';
import { selectContacts } from 'redux/contacts/selectors';
import { selectVisibleContacts } from 'redux/selectorsGlobal';
import { Section } from 'components/Section/Section';
import { Notification } from 'components/Notification/Notification';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/SearchFilter/SearcFilter';

export function App() {
  const contacts = useSelector(selectContacts);
  const visibleContacts = useSelector(selectVisibleContacts);

  return (
    <div>
      <Section title={'Phonebook'}>
        <ContactForm />
      </Section>
      <Section title={'Contacts'}>
        {contacts.length ? (
          <>
            <Filter />
            <ContactList contacts={visibleContacts} />
          </>
        ) : (
          <Notification message="No contacts added" />
        )}
      </Section>
    </div>
  );
}
