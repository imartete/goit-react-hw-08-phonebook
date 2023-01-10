import React from 'react';
import { useState, useEffect } from 'react';
import { Section } from 'components/Section/Section';
import { Notification } from 'components/Notification/Notification';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/SearchFilter/SearcFilter';
import { nanoid } from 'nanoid';

const LOCAL_STORAGE_KEY = 'contacts';

export function App() {
  const [contacts, setContact] = useState(
    () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(
    () => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts)),
    [contacts]
  );

  function addContact({ name, number }) {
    const existingContact = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (!existingContact) {
      setContact(prevContacts => [
        { name, number, id: nanoid() },
        ...prevContacts,
      ]);
      return;
    }
    alert(`${name} is alredy in contacts.`);
  }

  function removeContact(contactId) {
    setContact(contacts.filter(el => el.id !== contactId));
  }

  function handleSearch(value) {
    setFilter(value);
  }

  function getVisibleContacts() {
    const normalizedFilter = filter.toLowerCase().trim();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  return (
    <div>
      <Section title={'Phonebook'}>
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title={'Contacts'}>
        {contacts.length ? (
          <>
            <Filter searchItemHandler={handleSearch} value={filter} />
            <ContactList
              contacts={getVisibleContacts()}
              removeItem={removeContact}
            />
          </>
        ) : (
          <Notification message="No contacts added" />
        )}
      </Section>
    </div>
  );
}
