import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAt, IconKey } from '@tabler/icons';
import { useDispatch } from 'react-redux';
import { logIn } from '../redux/user/operations';

export function LoginForm() {
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: { email: '', password: '' },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: value => (!value.length ? 'Please enter your password' : null),
    },
  });

  // TODO: error handling with redux

  function handleSubmit(values) {
    console.log(values);
    dispatch(logIn(values));
    form.reset();
  }

  return (
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
  );
}
