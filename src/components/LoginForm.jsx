import { Alert, Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle, IconAt, IconKey } from '@tabler/icons';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { reduceError } from 'redux/user/userSlice';
import { logIn } from '../redux/user/operations';

export function LoginForm() {
  const dispatch = useDispatch();
  const { error } = useAuth();

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

  function handleSubmit(values) {
    dispatch(logIn(values));
  }

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)} autoComplete="off">
        <TextInput
          sx={{ maxWidth: 300 }}
          label="Email"
          // type="email"
          name="email"
          withAsterisk
          icon={<IconAt size={14} />}
          {...form.getInputProps('email')}
        />
        <PasswordInput
          sx={{ maxWidth: 300 }}
          label="Password"
          name="password"
          withAsterisk
          icon={<IconKey size={14} />}
          {...form.getInputProps('password')}
        />
        <Button
          type="submit"
          variant="gradient"
          gradient={{ from: 'teal', to: 'lime', deg: 105 }}
        >
          Log In
        </Button>
      </form>
      {error && (
        <Alert icon={<IconAlertCircle size={16} />} title="Bummer!" color="red">
          User not found. Invalid data entered.
        </Alert>
      )}
    </>
  );
}
