import { deleteContact, editContact } from '../redux/contacts/operations';
import { useState } from 'react';
import { ActionIcon, Flex, Text, TextInput } from '@mantine/core';
import { IconCheck, IconPencil, IconTrash, IconX } from '@tabler/icons';
import { useForm } from '@mantine/form';
import { selectContacts } from '../redux/contacts/selectors';
import { useMediaQuery } from '@mantine/hooks';
import { useAppDispatch, useAppSelector } from '../hooks/typedHooks';
import { Contact, ContactResponse } from '../redux/types';
import { showNotification } from '@mantine/notifications';

export const ContactListItem = ({ id, name, number }: ContactResponse) => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const [editMode, setEditMode] = useState<boolean>(false);
  const middleScreen = useMediaQuery('(min-width: 600px)');

  const form = useForm({
    initialValues: { name: name, number: number },

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

  function handleRemove() {
    dispatch(deleteContact(id));
  }

  function handleEdit() {
    setEditMode(e => !e);
  }

  function handleSubmit(values: Contact) {
    if (
      !contacts.some(
        contact =>
          contact.name.toLowerCase() === values.name.toLowerCase() &&
          contact.number === values.number
      )
    )
      dispatch(editContact({ id, ...values }));
    setEditMode(false);
  }

  return (
    <li style={{ marginTop: 10 }}>
      <Flex
        sx={{
          width: middleScreen ? 400 : 'auto',
          padding: 10,
          borderRadius: 5,
        }}
        mih={50}
        bg="rgba(0, 0, 0, .2)"
        gap="lg"
        justify="space-between"
        align="center"
        direction="row"
        wrap="wrap"
      >
        {editMode ? (
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Flex gap="sm">
              <TextInput type="text" {...form.getInputProps('name')} />
              <TextInput type="number" {...form.getInputProps('number')} />
              <Flex direction="row" gap="sm">
                <ActionIcon type="submit" variant="outline" color="green">
                  <IconCheck size={16} />
                </ActionIcon>
                <ActionIcon
                  type="button"
                  variant="outline"
                  color="indigo"
                  onClick={() => {
                    form.setFieldValue(form.values.name, form.values.number);
                    setEditMode(false);
                    form.reset();
                  }}
                >
                  <IconX size={16} />
                </ActionIcon>
              </Flex>
            </Flex>
          </form>
        ) : (
          <Flex gap="sm" align="start">
            <Text fw={500}>{name}</Text>
            <Text fw={400}>{number}</Text>
          </Flex>
        )}
        {!editMode && (
          <Flex
            gap="sm"
            mih={50}
            justify="space-between"
            align="center"
            direction="row"
          >
            <ActionIcon onClick={handleEdit} variant="outline" color="indigo">
              <IconPencil size={16} />
            </ActionIcon>
            <ActionIcon onClick={handleRemove} variant="outline" color="red">
              <IconTrash size={16} />
            </ActionIcon>
          </Flex>
        )}
      </Flex>
    </li>
  );
};
