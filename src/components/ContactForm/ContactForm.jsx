import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/contacts/selectors';
import './ContactForm.modules.css';
import { addContact } from 'redux/contacts/operations';
import { Button, TextInput } from '@mantine/core';

export function ContactForm() {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const existingContact = contacts.some(
    contact => contact.name.toLowerCase() === name.toLowerCase()
  );

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === 'name') setName(value);
    if (name === 'number') setNumber(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (existingContact) {
      alert('Already in contacts');
      return;
    }
    setName('');
    setNumber('');
    dispatch(addContact({ name, number }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <TextInput
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </label>
      <label>
        Number
        <TextInput
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </label>
      <Button
        type="submit"
        variant="gradient"
        gradient={{ from: 'indigo', to: '#BAC8FF' }}
        sx={{
          fontSize: '16px',
        }}
      >
        Add contact
      </Button>
    </form>
  );
}
