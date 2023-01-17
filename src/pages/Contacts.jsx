import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContactList } from 'components/ContactList/ContactList';
import {
  selectContacts,
  selectError,
  selectLoading,
} from 'redux/contacts/selectors';
import { fetchContacts } from 'redux/contacts/operations';
import { Filter } from 'components/SearchFilter/SearcFilter';
import { Section } from 'components/Section/Section';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Notification } from 'components/Notification/Notification';
import { Loader } from 'components/Loader/Loader';

export default function Contacts() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    // TODO: conditional rendering HERE, not in APP
    <>
      {/* <TaskEditor /> */}
      <Section title={'Phonebook'}>
        <ContactForm />
      </Section>
      <Section title={'Contacts'}>
        {!contacts.length && <Notification message="No contacts added" />}
        {contacts && (
          <>
            <Filter />
            <ContactList />
          </>
        )}
        {isLoading && <Loader />}
        {error && <p>An error has occured. {error}</p>}
      </Section>
    </>
  );
}
