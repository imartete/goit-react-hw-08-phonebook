import React from 'react';
// import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Section } from 'components/Section/Section';
import { Notification } from 'components/Notification/Notification';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/SearchFilter/SearcFilter';

// const LOCAL_STORAGE_KEY = 'contacts';

export function App() {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter.value);

  // const [contacts, setContact] = useState(
  //   () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  // );

  // useEffect(
  //   () => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts)),
  //   [contacts]
  // );

  function getVisibleContacts() {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  return (
    <div>
      <Section title={'Phonebook'}>
        <ContactForm />
      </Section>
      <Section title={'Contacts'}>
        {contacts.length ? (
          <>
            <Filter />
            <ContactList contacts={getVisibleContacts()} />
          </>
        ) : (
          <Notification message="No contacts added" />
        )}
      </Section>
    </div>
  );
}
