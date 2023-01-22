import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, editContact } from 'redux/contacts/operations';
import { useState } from 'react';
import { ActionIcon, Flex, Text, TextInput } from '@mantine/core';
import { IconCheck, IconPencil, IconTrash } from '@tabler/icons';
import { useForm } from '@mantine/form';
import { selectContacts } from 'redux/contacts/selectors';
import { useMediaQuery } from '@mantine/hooks';

export const ContactListItem = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const contacts = useSelector(selectContacts);
  const middleScreen = useMediaQuery('(min-width: 600px)');

  const form = useForm({
    initialValues: { name: name, number: number },

    validate: {
      name: value => {
        return value.length &&
          /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/.test(
            value
          ) &&
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

  function handleSubmit(values) {
    // TODO cancel
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
              <ActionIcon type="submit" variant="outline" color="green">
                <IconCheck size={16} />
              </ActionIcon>
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
            sx={{}}
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

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
