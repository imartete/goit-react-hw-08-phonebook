import { Alert, Button, PasswordInput, TextInput } from '@mantine/core';
import { IconAlertCircle, IconAt, IconKey, IconUser } from '@tabler/icons';
import { useDispatch } from 'react-redux';
import { register } from '../redux/user/operations';
import { useForm } from '@mantine/form';
import { useAuth } from 'hooks/useAuth';

export function RegisterForm() {
  const dispatch = useDispatch();
  const { error } = useAuth();

  const form = useForm({
    initialValues: { name: '', email: '', password: '' },

    validate: {
      name: value =>
        value.length < 2 ? 'Name must have at least 2 characters' : null,
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: value =>
        value.length < 10 ? 'Password must have at least 10 characters' : null,
    },
  });

  function handleSubmit(values) {
    console.log(values);
    dispatch(register(values));
    form.reset();
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} autoComplete="off">
      <TextInput
        sx={{ maxWidth: 300 }}
        label="Username"
        type="text"
        withAsterisk
        icon={<IconUser size={14} />}
        {...form.getInputProps('name')}
      />
      <TextInput
        sx={{ maxWidth: 300 }}
        label="Email"
        type="email"
        withAsterisk
        icon={<IconAt size={14} />}
        {...form.getInputProps('email')}
      />
      <PasswordInput
        sx={{ maxWidth: 300 }}
        label="Password"
        withAsterisk
        icon={<IconKey size={14} />}
        {...form.getInputProps('password')}
      />
      <Button
        type="submit"
        variant="gradient"
        gradient={{ from: 'teal', to: 'lime', deg: 105 }}
      >
        Register
      </Button>
      {error && (
        <Alert icon={<IconAlertCircle size={16} />} title="Bummer!" color="red">
          Something terrible happened! Invalid data entered.
        </Alert>
      )}
    </form>
  );
}
