import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import {
  selectContacts,
  selectError,
  selectLoading,
} from 'redux/contacts/selectors';
import { selectVisibleContacts } from 'redux/selectorsGlobal';
import { Section } from 'components/Section/Section';
import { Notification } from 'components/Notification/Notification';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/SearchFilter/SearcFilter';
import { Loader } from 'components/Loader/Loader';

export function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const visibleContacts = useSelector(selectVisibleContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Section title={'Phonebook'}>
        <ContactForm />
      </Section>
      <Section title={'Contacts'}>
        {contacts && !error && !isLoading && (
          <>
            <Filter />
            <ContactList contacts={visibleContacts} />
          </>
        )}
        {!contacts.length && !error && !isLoading && (
          <Notification message="No contacts added" />
        )}
        {isLoading && <Loader />}
        {error && <p>An error has occured. {error}</p>}
      </Section>
    </>
  );
}
