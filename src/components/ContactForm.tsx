import React from 'react';
import { selectContacts } from '../redux/contacts/selectors';
import { addContact } from '../redux/contacts/operations';
import { Button, Flex, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useMediaQuery } from '@mantine/hooks';
import { useAppDispatch, useAppSelector } from '../hooks/typedHooks';
import { Contact } from '../redux/types';

export function ContactForm() {
  const contacts = useAppSelector(selectContacts);
  const dispatch = useAppDispatch();
  const largeScreen = useMediaQuery('(min-width: 900px)');

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

  function handleSubmit(value: Contact) {
    dispatch(addContact(value));
    form.reset();
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex
        sx={{
          width: largeScreen ? 400 : 'auto',
        }}
      >
        <TextInput
          label="Username"
          type="text"
          withAsterisk
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Number"
          type="phone"
          withAsterisk
          {...form.getInputProps('number')}
        />
        <Button type="submit" variant="gradient">
          Add contact
        </Button>
      </Flex>
    </form>
  );
}
