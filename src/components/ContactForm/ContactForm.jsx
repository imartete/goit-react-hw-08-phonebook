import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/contacts/selectors';
import './ContactForm.modules.css';
import { addContact } from 'redux/contacts/operations';
import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

export function ContactForm() {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: { name: '', number: '' },

    validate: {
      name: value => {
        const existingContact = contacts.some(
          contact => contact.name.toLowerCase() === value.toLowerCase()
        );
        if (existingContact)
          showNotification({
            color: 'red',
            message: `${value} is already in contacts`,
          });
        return value.length &&
          /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/.test(
            value
          ) &&
          !existingContact &&
          value.length < 35
          ? null
          : 'Invalid name';
      },
      number: value => {
        return /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/.test(
          value
        ) && value.length < 20
          ? null
          : 'Invalid number';
      },
    },
  });

  function handleSubmit(value) {
    dispatch(addContact(value));
    form.reset();
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        sx={{ maxWidth: 300 }}
        label="Username"
        type="text"
        withAsterisk
        {...form.getInputProps('name')}
      />
      <TextInput
        sx={{ maxWidth: 300 }}
        label="Number"
        type="phone"
        withAsterisk
        {...form.getInputProps('number')}
      />
      <Button
        type="submit"
        variant="gradient"
        gradient={{ from: 'indigo', to: '#BAC8FF' }}
        sx={{
          width: 200,
          fontSize: '16px',
        }}
      >
        Add contact
      </Button>
    </form>
  );
}
