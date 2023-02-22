import { Alert, Button, Flex, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { IconAlertCircle, IconAt, IconKey } from '@tabler/icons';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { reduceError } from '../redux/user/userSlice';
import { logIn } from '../redux/user/operations';
import { useAppDispatch } from '../hooks/typedHooks';
import { UserLoginRequest } from '../redux/types';

export function LoginForm() {
  const dispatch = useAppDispatch();
  const { error } = useAuth();
  const largeScreen = useMediaQuery('(min-width: 900px)');

  useEffect(() => {
    dispatch(reduceError());
  }, [dispatch]);

  const form = useForm({
    initialValues: { email: '', password: '' },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: value => (!value.length ? 'Please enter your password' : null),
    },
  });

  function handleSubmit(values: UserLoginRequest): void {
    dispatch(logIn(values));
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
            label="Email"
            name="email"
            withAsterisk
            icon={<IconAt size={14} />}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            name="password"
            withAsterisk
            icon={<IconKey size={14} />}
            {...form.getInputProps('password')}
          />
          <Button type="submit">Log In</Button>
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
