import { Alert, Button, Flex, PasswordInput, TextInput } from '@mantine/core';
import { IconAlertCircle, IconAt, IconKey, IconUser } from '@tabler/icons';
import { register } from '../redux/user/operations';
import { useForm } from '@mantine/form';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { reduceError } from '../redux/user/userSlice';
import { useMediaQuery } from '@mantine/hooks';
import { useAppDispatch } from '../hooks/typedHooks';
import { UserRegisterRequest } from '../redux/types';

export function RegisterForm() {
  const dispatch = useAppDispatch();
  const { error } = useAuth();
  const largeScreen = useMediaQuery('(min-width: 900px)');

  useEffect(() => {
    dispatch(reduceError());
  }, [dispatch]);

  const form = useForm({
    initialValues: { name: '', email: '', password: '' },

    validate: {
      name: value =>
        value.length < 2 ? 'Name must have at least 2 characters' : null,
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: value =>
        value.length < 7 ? 'Password must have at least 7 characters' : null,
    },
  });

  function handleSubmit(values: UserRegisterRequest) {
    dispatch(register(values));
  }

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)} autoComplete="off">
        <Flex
          sx={{
            width: largeScreen ? 400 : 'auto',
          }}
        >
          <TextInput
            label="Username"
            type="text"
            withAsterisk
            icon={<IconUser size={14} />}
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Email"
            type="email"
            withAsterisk
            icon={<IconAt size={14} />}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            withAsterisk
            icon={<IconKey size={14} />}
            {...form.getInputProps('password')}
          />
          <Button type="submit">Register</Button>
        </Flex>
      </form>
      {error && (
        <Alert
          sx={{
            width: largeScreen ? 400 : 'auto',
            marginTop: 30,
          }}
          icon={<IconAlertCircle size={16} />}
          title="Bummer!"
          color="red"
        >
          {error}
        </Alert>
      )}
    </>
  );
}
