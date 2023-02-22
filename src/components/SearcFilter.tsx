import { TextInput } from '@mantine/core';
import { useAppDispatch } from '../hooks/typedHooks';
import { setFilter } from '../redux/filter/filterSlice';

export const Filter = () => {
  const dispatch = useAppDispatch();

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>): void {
    dispatch(setFilter(event.target.value));
  }

  return (
    <TextInput
      sx={{
        width: 250,
      }}
      onInput={handleSearch}
      placeholder="Search contact"
    />
  );
};
