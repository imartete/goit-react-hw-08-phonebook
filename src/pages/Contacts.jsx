import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContactList } from 'components/ContactList';
import {
  selectContacts,
  selectError,
  selectLoading,
} from 'redux/contacts/selectors';
import { fetchContacts } from 'redux/contacts/operations';
import { Filter } from 'components/SearcFilter';
import { ContactForm } from 'components/ContactForm';
import { Loader } from 'components/Loader/Loader';
import { Alert, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

export default function Contacts() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      {error && (
        <Alert
          sx={{
            width: 250,
            marginTop: 30,
            marginBottom: 30,
          }}
          icon={<IconAlertCircle size={16} />}
          title="Bummer!"
          color="red"
        >
          An error has occured. {error}
        </Alert>
      )}
      {!contacts.length ? (
        <Text>No contacts added ¯\_(ツ)_/¯</Text>
      ) : (
        <>
          <Filter />
          <ContactList />
        </>
      )}
      {isLoading && <Loader />}
    </>
  );
}
